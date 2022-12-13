'use client';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { ApiClient } from 'lib/axios/Api';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
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
        <Box p="5" sx={{ height: '100vh' }} bgColor="gray.50">
            <Grid alignItems={'center'} justifyContent={'center'} h="full">
                <GridItem
                    bgColor={'white'}
                    boxShadow={'sm'}
                    w={'container.sm'}
                    height={'container.sm'}
                    rounded="md"
                    p="10"
                >
                    <Flex
                        flexDir={'column'}
                        justifyContent={'space-evenly'}
                        h="full"
                    >
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
                                <FormControl
                                    isInvalid={errors.username ? true : false}
                                >
                                    <FormLabel fontWeight={'semibold'}>
                                        Username
                                    </FormLabel>
                                    <Input
                                        autoComplete="true"
                                        placeholder="username"
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
                                            placeholder="Enter password"
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
                                    mt={'5'}
                                    type="submit"
                                    colorScheme={'green'}
                                    width={'full'}
                                    p="6"
                                >
                                    Sign In
                                </Button>
                            </VStack>
                        </form>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
}
