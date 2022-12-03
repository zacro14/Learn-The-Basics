'use client';
import {
    Box,
    Button,
    Flex,
    FormControl,
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

export default function Login() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

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

                        <VStack pt={'10'}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>
                                    Email
                                </FormLabel>
                                <Input name="email" placeholder="Enter email" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>
                                    Password
                                </FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        pr="4.5rem"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Enter password"
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
                            </FormControl>
                            <Button colorScheme={'green'} width={'full'} p="6">
                                Sign In
                            </Button>
                        </VStack>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
}
