'use client';
import {
    Alert,
    AlertIcon,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
    Divider,
    Link,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { ApiClient } from 'lib/axios/Api';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import AuthContainer from 'component/Container/Auth/Auth';
interface Inputs {
    username: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [axiosResponse, setAxiosResponse] = useState<
        AxiosResponse | undefined
    >(undefined);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const handleClick = () => setShow(!show);
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        ApiClient.post('/auth/signin', {
            ...data,
        })
            .then(function (response: AxiosResponse) {
                Cookie.set('token', response.data.accessToken);
                // router.push('/dashboard');
            })
            .catch(function (err) {
                setAxiosResponse(err);
            });
    };

    return (
        <AuthContainer>
            <Flex flexDir={'column'} h="full">
                <VStack>
                    <Heading fontSize={'3xl'}>
                        Welcome to Learn The Basics
                    </Heading>
                    <Text>where you learn the basics teachings </Text>
                </VStack>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack pt={'10'}>
                        {axiosResponse?.status === 400 && (
                            <Alert status="error" my={'3'}>
                                <AlertIcon />
                                {axiosResponse?.data?.message}
                            </Alert>
                        )}
                        <FormControl isInvalid={errors.username ? true : false}>
                            <FormLabel fontWeight={'semibold'}>
                                Username
                            </FormLabel>
                            <Input
                                autoComplete="true"
                                {...register('username', {
                                    required: true,
                                })}
                            />
                            {errors.username && (
                                <FormErrorMessage>
                                    username is required
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>
                                Password
                            </FormLabel>
                            <InputGroup size="md">
                                <Input
                                    autoComplete="current-password"
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    {...register('password', {
                                        required: true,
                                    })}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && (
                                <FormErrorMessage>
                                    Password is required.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Button
                            p="5"
                            type="submit"
                            colorScheme={'green'}
                            width={'full'}
                        >
                            Sign In
                        </Button>
                    </VStack>
                </form>
                <Divider w={'full'} py={'5'} />
                <Text fontWeight={'thin'}>
                    Don&apos;t have an account?{' '}
                    <Link
                        as={NextLink}
                        href={'/auth/sign-up'}
                        color={'green.500'}
                    >
                        Sign up
                    </Link>
                </Text>
            </Flex>
        </AuthContainer>
    );
}