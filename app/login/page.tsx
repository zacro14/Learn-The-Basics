'use client';
import {
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
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
    email: string;
    password: string;
}

export default function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    console.log(watch('email'));

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
                                <FormControl
                                    isInvalid={errors.email ? true : false}
                                >
                                    <FormLabel fontWeight={'semibold'}>
                                        Email
                                    </FormLabel>
                                    <Input
                                        placeholder="Enter email"
                                        {...register('email', {
                                            required: true,
                                        })}
                                    />
                                    {errors.email && (
                                        <FormErrorMessage>
                                            Email is required.
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
