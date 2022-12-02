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
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

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
    ]
    return (
        <Box bgColor={'gray.100'} position="relative" display={'flex'}>
            <Box
                pos={'sticky'}
                as="nav"
                w="80"
                bgColor={'white'}
                boxShadow="md"
            >
                <VStack alignItems={'start'} p="5" mt={'20'}>
                    <List width="full">
                        {navigation.map(({ name, link, icon }, index) => (
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
                                    mr="4"
                                />
                                <Link href={link}>{name}</Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider p={'3'} />

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
            <Box as="section" flex={'1'}>
                {children}
            </Box>
        </Box>
    )
}
