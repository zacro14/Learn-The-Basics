import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from 'component/loading';
import useToastNotification from 'hooks/toast/useToast';
import { ApiClientPrivate } from 'lib/axios/Api';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { fetchUser, User } from 'service/user/fetchUser';
import * as yup from 'yup';

const schema = yup
    .object({
        username: yup
            .string()
            .min(5, 'min of 5 characters')
            .max(30, 'max of 30 charcters'),

        email: yup.string().email('please input a valid email'),
        firstname: yup.string(),
        lastname: yup.string(),
    })
    .required();

export function UserFormTemplate() {
    const { data: session } = useSession();
    const toast = useToast();
    const userId = session?.user.id;
    const { data, isError, isLoading } = useQuery(['user', userId], () =>
        fetchUser(userId)
    );

    const mutation = useMutation(
        (data: User) => {
            console.log('input data', data);
            console.log('id', userId);
            return ApiClientPrivate.patch(`/user/${userId}`, data);
        },
        {
            onSuccess() {
                toast({
                    title: 'Profile updated.',
                    description: "We've successfully updated your profile.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            },
            onError() {
                toast({
                    title: 'Profile updating error.',
                    description: 'unknown error in updating error',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            },
        }
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<User>({
        resolver: yupResolver(schema),
    });

    if (isError) {
        return <Heading>Error</Heading>;
    }

    if (isLoading) {
        return <Loading />;
    }

    const onSubmit = handleSubmit((inputData) => {
        mutation.mutate(inputData);
    });
    return (
        <form onSubmit={onSubmit}>
            <Heading fontSize={'2xl'}>My Profile</Heading>
            <Stack spacing={'5'} my={'5'}>
                <Avatar size={'lg'} name={data?.username} />
                <FormControl>
                    <FormLabel fontWeight={800}>Username</FormLabel>
                    <Input
                        defaultValue={data?.username}
                        {...register('username')}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={800}>Email</FormLabel>
                    <Input defaultValue={data?.email} {...register('email')} />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={800}>First Name</FormLabel>
                    <Input
                        defaultValue={data?.firstname}
                        {...register('firstname')}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight={800}>Last Name</FormLabel>
                    <Input
                        defaultValue={data?.lastname}
                        {...register('lastname')}
                    />
                </FormControl>
            </Stack>
            <Button
                isLoading={isSubmitting}
                variant={'base'}
                type="submit"
                fontWeight={'semibold'}
            >
                Update
            </Button>
        </form>
    );
}
