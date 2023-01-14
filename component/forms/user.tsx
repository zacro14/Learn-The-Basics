import {
    Avatar,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from 'component/loading';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
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
    const userId = session?.user.id;
    const { data, isError, isLoading } = useQuery(['user', userId], () =>
        fetchUser(userId)
    );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Partial<User>>({
        resolver: yupResolver(schema),
    });

    if (isError) {
        return <Heading>Error</Heading>;
    }

    if (isLoading) {
        return <Loading />;
    }

    console.log('data =>', data);

    const onSubmit: SubmitHandler<Partial<User>> = (data) =>
        console.log('data', data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button variant={'base'} type="submit" fontWeight={'semibold'}>
                Update
            </Button>
        </form>
    );
}
