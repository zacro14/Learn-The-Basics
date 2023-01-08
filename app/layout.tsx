'use client';

import '@fontsource/poppins';
import '@fontsource/open-sans';
import { Center, ChakraProvider, Spinner, useToast } from '@chakra-ui/react';
import theme from 'theme/theme';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const toast = useToast();
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error) =>
                toast({
                    title: `Error `,
                    description: `${error}`,
                    status: 'error',
                    isClosable: true,
                }),
        }),
    });
    return (
        <html lang="en" style={{ background: '#fafafa' }}>
            <head />
            <body>
                <SessionProvider>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <ChakraProvider theme={theme}>
                            {children}
                        </ChakraProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}

function Auth(children: React.ReactNode) {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <Center>
                <Spinner color="green.500" />
            </Center>
        );
    }

    return children;
}
