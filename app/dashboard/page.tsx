'use client';
import { Box, Text } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';

export default function Dashboard() {
    const session = getSession();
    console.log('data', session);
    return (
        <Box sx={{ minHeight: '100vh' }} p={'5'}>
            DashBoard
        </Box>
    );
}
