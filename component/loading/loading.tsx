import { Flex, Spinner } from '@chakra-ui/react';

export function Loading() {
    return (
        <Flex
            sx={{ height: '100vh' }}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Spinner color="green.500" />
        </Flex>
    );
}
