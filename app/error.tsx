'use client';
import { Box, Center, Heading } from '@chakra-ui/react';
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
            <Center>
                <Heading>Oops Something went wrong</Heading>
            </Center>
        </Box>
    );
}
