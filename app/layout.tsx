'use client';

import '@fontsource/poppins';
import '@fontsource/open-sans';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import theme from 'theme/theme';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';

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
                        <ReactQueryDevtools initialIsOpen={false} />
                        <ChakraProvider theme={theme}>
                            {children}
                        </ChakraProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
