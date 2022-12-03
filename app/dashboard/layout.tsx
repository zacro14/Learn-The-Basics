'use client'
import {
    Box,
    Divider,
    List,
    ListIcon,
    ListItem,
    VStack,
} from '@chakra-ui/react'
import {
    Squares2X2Icon,
    ListBulletIcon,
    Cog6ToothIcon,
    DocumentIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import DashboardHeader from '../../component/dashboard/Header'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
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
            link: '/dashboard/category/lessons',
            icon: DocumentIcon,
        },
    ]
    return (
        <>
            <DashboardHeader />
            <Box display={'flex'} bgColor={'gray.100'}>
                <Box w="80" bgColor={'white'} boxShadow="lg">
                    <Box pos={'sticky'} as="nav" top={'16'}>
                        <VStack alignItems={'start'} p="5">
                            <List width="full">
                                {navigation.map(
                                    ({ name, link, icon }, index) => (
                                        <ListItem
                                            key={index}
                                            rounded={'lg'}
                                            p={'5'}
                                            width={'full'}
                                            cursor="pointer"
                                            _hover={{ bgColor: 'gray.100' }}
                                        >
                                            <ListIcon
                                                as={icon}
                                                color="green.500"
                                                boxSize={'5'}
                                                mr="5"
                                            />
                                            <Link href={link}>{name}</Link>
                                        </ListItem>
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

                <Box width={'full'} as="main" pt="16">
                    {children}
                </Box>
            </Box>
        </>
    )
}
