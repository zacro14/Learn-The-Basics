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
    Icon,
    Input,
    Link,
    ListItem,
    Text,
    Tooltip,
    UnorderedList,
    VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import AuthContainer from 'component/Container/Auth/Auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

type Signup = yup.TypeOf<typeof schema>;

const schema = yup.object({
    firstName: yup.string().required('Please enter your first name.'),
    lastName: yup.string().required('Please enter your lastname.'),
    userName: yup.string().required('Please enter your username.'),
    email: yup
        .string()
        .required('Please enter your email.')
        .email('Please enter an email.'),
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
        formState: { errors, isDirty, isValid },
    } = useForm<Signup>({ resolver: yupResolver(schema) });

    const onSubmitHandler: SubmitHandler<Signup> = (data) => {
        console.log(data);
    };

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
                        <FormControl isInvalid={errors.email ? true : false}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="jhondoe@email.com"
                                type={'email'}
                                {...register('email')}
                            />
                            {errors.email && (
                                <FormErrorMessage>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={errors.firstName ? true : false}
                        >
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="eg. Jhon"
                                {...register('firstName')}
                            />
                            {errors.firstName && (
                                <FormErrorMessage>
                                    {errors.firstName?.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.lastName ? true : false}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="eg. Doe"
                                {...register('lastName')}
                            />
                            {errors.lastName && (
                                <FormErrorMessage>
                                    {errors.lastName?.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={errors.password ? true : false}>
                            <FormLabel
                                display={'flex'}
                                alignItems={'center'}
                                gap={'1'}
                            >
                                <Text>Password</Text>
                                <Tooltip
                                    placement={'right'}
                                    hasArrow
                                    label={
                                        <Box
                                            p={'2'}
                                            fontSize={'xs'}
                                            rounded={'2xl'}
                                        >
                                            <Text
                                                fontSize={'xs'}
                                                color={'black'}
                                                as={'span'}
                                                fontWeight={'bold'}
                                            >
                                                Password must have
                                            </Text>
                                            <UnorderedList
                                                pl={'5'}
                                                color={'blackAlpha.800'}
                                            >
                                                <ListItem>
                                                    at least eight characters
                                                    long;
                                                </ListItem>
                                                <ListItem>
                                                    a lowercase letter;
                                                </ListItem>
                                                <ListItem>
                                                    an uppercase letter;
                                                </ListItem>
                                                <ListItem>
                                                    a special character like
                                                    ".!@#$%^&*()+-=,".
                                                </ListItem>
                                            </UnorderedList>
                                        </Box>
                                    }
                                    bg={'white'}
                                    boxShadow={'2xl'}
                                >
                                    <Icon
                                        as={InformationCircleIcon}
                                        color={'gray.500'}
                                    />
                                </Tooltip>
                            </FormLabel>

                            <Input
                                type={'password'}
                                autoComplete="current-password"
                                placeholder="Create a password"
                                pr="4.5rem"
                                {...register('password')}
                            />
                            {errors.password && (
                                <FormErrorMessage>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            )}
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