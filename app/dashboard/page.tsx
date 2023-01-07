'use client';
import { Box } from '@chakra-ui/react';

export default function Dashboard() {
    return (
        <Box sx={{ minHeight: '100vh' }} p={'5'}>
            DashBoard
        </Box>
    );
}

Dashboard.auth = {
    role: 'TEACHER',
    unauthorized: '/',
};
