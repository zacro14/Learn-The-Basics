'use client';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import AuthContainer from 'component/Container/Auth/Auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Signup = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isAgreeTerms: boolean;
};

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email(),
    password: yup
        .string()
        .required('password is required')
        .min(8, 'Password is to short - should be 8 chars minimum'),
});
export default function Signup() {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<Signup>();
    const onSubmit = handleSubmit((data) => console.log(data));
    return (
        <AuthContainer>
            <Flex flexDir={'column'} h="full">
                <VStack>
                    <Heading fontSize={'3xl'}>Create your account</Heading>
                </VStack>

                <form onSubmit={onSubmit}>
                    <VStack pt={'10'} spacing="5">
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input placeholder="Create username" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="jhondoe@email.com"
                                type={'email'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input placeholder="eg. Jhon" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input placeholder="eg. Doe" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type={'password'}
                                autoComplete="current-password"
                                pr="4.5rem"
                            />
                        </FormControl>
                        <Checkbox alignItems={'start'}>
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
