'use client';

import '@fontsource/poppins';
import '@fontsource/open-sans';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();
    return (
        <html lang="en">
            <head />
            <body>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <ChakraProvider theme={theme}>{children}</ChakraProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
