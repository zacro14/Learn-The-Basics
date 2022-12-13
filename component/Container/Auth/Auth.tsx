import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Children, ReactNode } from 'react';

export default function AuthContainer({ children }: { children: ReactNode }) {
    return (
        <Box p="5" sx={{ height: '100vh' }} bgColor="gray.50">
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
