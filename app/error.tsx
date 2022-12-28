'use client';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <Box
            sx={{ heigth: '100vh' }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Center
                sx={{ height: '100vh' }}
                display={'flex'}
                flexDir={'column'}
            >
                <Heading>Oops Something went wrong</Heading>
                <HStack mt={'5'}>
                    <Link href={'/'}>
                        <Button colorScheme={'green'}>Home</Button>
                    </Link>
                </HStack>
            </Center>
        </Box>
    );
}
