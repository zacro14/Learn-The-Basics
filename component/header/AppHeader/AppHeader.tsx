import { Box, Button, Flex, HStack, Link } from '@chakra-ui/react';
import { AppLogo } from 'component/logo';
import NextLink from 'next/link';

export function AppHeader() {
    return (
        <Box boxShadow={'sm'} bgColor={'white'} width={'ful'}>
            <Flex mx={'10'} p={'5'} justifyContent={'space-between'}>
                <Box>
                    <AppLogo width={60} height={60} />
                </Box>
                <HStack>
                    <NextLink passHref href={'/auth/sign-in'}>
                        <Button
                            variant={'ghost'}
                            _hover={{
                                textDecoration: 'none',
                                color: 'green.500',
                            }}
                        >
                            Log in
                        </Button>
                    </NextLink>
                    <NextLink passHref href={'/auth/sign-up'}>
                        <Button
                            colorScheme={'green'}
                            rounded={'3xl'}
                            _hover={{ textDecoration: 'none' }}
                        >
                            Sign Up
                        </Button>
                    </NextLink>
                </HStack>
            </Flex>
        </Box>
    );
}
