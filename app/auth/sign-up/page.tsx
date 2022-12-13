'use client';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import AuthContainer from 'component/Container/Auth/Auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Signup = yup.TypeOf<typeof schema>;
// firstName: string;
// lastName: string;
// userName: string;
// email: string;
// password: string;
// isAgreeTerms: boolean;

const schema = yup.object({
    firstName: yup.string().required('Please enter your first name.'),
    lastName: yup.string().required('Please enter your lastname.'),
    userName: yup.string().required('Please enter your username.'),
    email: yup.string().email('Please enter an email.'),
    password: yup
        .string()
        .required('password is required.')
        .min(8, 'Password is to short - should be 8 chars minimum.')
        .matches(/[0-9]/, 'Password requires a number.')
        .matches(/[a-z]/, 'Password requires a lowercase letter.')
        .matches(/[A-Z]/, 'Password requires an uppercase letter.')
        .matches(/[^\w]/, 'Password requires a symbol.'),
    isAgreeTerms: yup.bool().required('required'),
});
export default function Signup() {
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Signup>({ resolver: yupResolver(schema) });

    const onSubmitHandler: SubmitHandler<Signup> = handleSubmit(
        (data: Signup) => console.log(data)
    );

    console.log(errors.userName);

    console.log(watch('userName'));
    return (
        <AuthContainer>
            <Flex flexDir={'column'} h="full">
                <VStack>
                    <Heading fontSize={'3xl'}>Create your account</Heading>
                </VStack>

                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <VStack pt={'10'} spacing="5">
                        <FormControl isInvalid={errors.userName ? true : false}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                autoComplete="username"
                                placeholder="Create username"
                                {...register('userName')}
                            />
                            {errors.userName && (
                                <FormErrorMessage>
                                    {errors.userName?.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="jhondoe@email.com"
                                type={'email'}
                                {...register('email')}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="eg. Jhon"
                                {...register('firstName')}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="eg. Doe"
                                {...register('lastName')}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type={'password'}
                                autoComplete="current-password"
                                pr="4.5rem"
                                {...register('password')}
                            />
                        </FormControl>
                        <Checkbox
                            colorScheme={'green'}
                            iconColor={'white'}
                            alignItems={'center'}
                            {...register('isAgreeTerms')}
                        >
                            <Box as="span">
                                I agree to the Learn The Basics{' '}
                                <Link
                                    as={NextLink}
                                    color={'green.500'}
                                    href={'/terms-of-service'}
                                >
                                    Term of Service{' '}
                                </Link>
                                and
                                <Link
                                    as={NextLink}
                                    color={'green.500'}
                                    href={'/terms-of-service'}
                                >
                                    {' '}
                                    Privacy Policy
                                </Link>
                                .
                            </Box>
                        </Checkbox>
                        <Button
                            isDisabled={!watch('isAgreeTerms')}
                            p="5"
                            type="submit"
                            colorScheme={'green'}
                            width={'full'}
                        >
                            Create Account
                        </Button>
                    </VStack>
                </form>
                <Divider w={'full'} py={'5'} />
                <Text fontWeight={'thin'}>
                    Already have an account?{' '}
                    <Link
                        as={NextLink}
                        href={'/auth/sign-in'}
                        color={'green.500'}
                    >
                        Log In
                    </Link>
                </Text>
            </Flex>
        </AuthContainer>
    );
}
