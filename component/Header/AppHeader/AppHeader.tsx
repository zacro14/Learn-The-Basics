import { Box } from '@chakra-ui/react';
import { AppLogo } from 'component/Logo';

export function AppHeader() {
    return (
        <Box mx={'10'}>
            <Box>
                <AppLogo width={60} height={60} />
            </Box>
        </Box>
    );
}
