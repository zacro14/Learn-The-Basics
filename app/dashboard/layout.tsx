'use client';
import {
    Box,
    Center,
    Divider,
    List,
    ListIcon,
    ListItem,
    Spinner,
    VStack,
} from '@chakra-ui/react';
import {
    Squares2X2Icon,
    ListBulletIcon,
    Cog6ToothIcon,
    DocumentIcon,
} from '@heroicons/react/24/outline';
import { DashboardHeader } from 'component/header/Dashboard';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter, notFound } from 'next/navigation';
import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const navigation = [
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: Squares2X2Icon,
        },
        {
            name: 'Category',
            link: '/dashboard/category',
            icon: ListBulletIcon,
        },
        {
            name: 'Lessons',
            link: '/dashboard/lessons',
            icon: DocumentIcon,
        },
    ];
    if (status === 'loading') {
        return (
            <Box sx={{ minHeight: '100vh' }} width={'full'} as="main" pt="16">
                <Center>
                    <Spinner color="green.500" />
                </Center>
            </Box>
        );
    }

    if (status === 'unauthenticated') {
        router.push('/');
    }

    return (
        <>
            <DashboardHeader />
            <Box display={'flex'} bgColor={'gray.100'}>
                <Box w="80" bgColor={'white'} boxShadow="lg">
                    <Box pos={'sticky'} as="nav" top={'16'}>
                        <VStack alignItems={'start'} p="5">
                            <List width="full" spacing={5}>
                                {navigation.map(
                                    ({ name, link, icon }, index) => (
                                        <Link key={index} href={link}>
                                            <ListItem
                                                rounded={'lg'}
                                                p={'5'}
                                                width={'full'}
                                                cursor="pointer"
                                                bgColor={
                                                    pathname === link
                                                        ? 'gray.100'
                                                        : undefined
                                                }
                                                _hover={{
                                                    bgColor: 'gray.50',
                                                }}
                                            >
                                                <ListIcon
                                                    as={icon}
                                                    color="green.500"
                                                    boxSize={'5'}
                                                    mr="5"
                                                />
                                                {name}
                                            </ListItem>
                                        </Link>
                                    )
                                )}
                            </List>

                            <Divider py={'3'} w={'full'} />

                            <List width={'full'}>
                                <ListItem
                                    rounded={'lg'}
                                    p={'5'}
                                    width={'full'}
                                    cursor="pointer"
                                    _hover={{ bgColor: 'gray.100' }}
                                >
                                    <ListIcon
                                        as={Cog6ToothIcon}
                                        color="green.500"
                                        boxSize={'5'}
                                        mr="4"
                                    />{' '}
                                    Settings
                                </ListItem>
                            </List>
                        </VStack>
                    </Box>
                </Box>

                <Box
                    sx={{ minHeight: '100vh' }}
                    width={'full'}
                    as="main"
                    pt="16"
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}
