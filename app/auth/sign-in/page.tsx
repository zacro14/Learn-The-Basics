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
    Icon,
    Toast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import NextLink from 'next/link';
import AuthContainer from 'component/container/Auth/AuthContainer';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Inputs = {
    username: string;
    password: string;
};

export default function Login() {
    const [show, setShow] = useState(false);
    const [signInError, setSigninError] = useState<string | undefined>(
        undefined
    );
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();

    const handleClick = () => setShow(!show);
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const signInStatus: SignInResponse | undefined = await signIn(
            'credentials',
            {
                redirect: false,
                usernameOrEmail: data.username,
                password: data.password,
            }
        );

        console.log('status', signInStatus);

        if (!signInStatus?.ok) {
            return setSigninError(signInStatus?.error);
        }

        reset();
        return router.push('/dashboard');
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
                        {signInError && (
                            <Alert status="error" my={'3'}>
                                <AlertIcon />
                                {signInError}
                            </Alert>
                        )}
                        <FormControl isInvalid={errors.username ? true : false}>
                            <FormLabel>Username or email</FormLabel>
                            <Input
                                autoComplete="true"
                                {...register('username', {
                                    required: true,
                                })}
                            />
                            {errors.username && (
                                <FormErrorMessage>
                                    Username or password is required
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.password ? true : false}>
                            <FormLabel>Password</FormLabel>
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
                                        bg={'green.300'}
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}
                                    >
                                        {show ? (
                                            <Icon
                                                color={'black'}
                                                as={EyeIcon}
                                            />
                                        ) : (
                                            <Icon
                                                color={'black'}
                                                as={EyeSlashIcon}
                                            />
                                        )}
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
                            isLoading={isSubmitting}
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
