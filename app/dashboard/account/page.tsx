'use client';
import { Box } from '@chakra-ui/react';
import { UserFormTemplate } from 'component/forms';

export default function Account() {
    return (
        <Box p={'5'} maxWidth={'2xl'}>
            <UserFormTemplate />
        </Box>
    );
}
