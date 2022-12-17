import { Box, Grid, GridItem } from '@chakra-ui/react';
import { AuthHeader } from 'component/header/Auth';
import { ReactNode } from 'react';

export default function AuthContainer({ children }: { children: ReactNode }) {
    return (
        <Box p="5" sx={{ minHeight: '100vh' }} bgColor="gray.50">
            <AuthHeader />
            <Grid alignItems={'center'} justifyContent={'center'} h="full">
                <GridItem
                    bgColor={'white'}
                    boxShadow={'sm'}
                    w={'container.sm'}
                    rounded="lg"
                    p="10"
                >
                    {children}
                </GridItem>
            </Grid>
        </Box>
    );
}
