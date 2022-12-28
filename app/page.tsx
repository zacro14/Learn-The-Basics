'use client';
import {
    Card,
    CardBody,
    Container,
    Text,
    Box,
    HStack,
    Center,
} from '@chakra-ui/react';
import { LessonsCard } from 'component/card';
import { AppHeader } from 'component/header/AppHeader';
import Link from 'next/link';
import { GetCookie } from 'utils/cookie/cookie';

export default function Home() {
    const Categories = [
        {
            name: 'Math',
        },
        {
            name: 'Science',
        },
    ];

    return (
        <Box bgColor={'gray.50'}>
            <AppHeader />
            <Box p={'5'} mx={'24'}>
                <HStack>
                    {Categories.map(({ name }, i) => (
                        <Link key={i} href={`/category/${name}`}>
                            <Card
                                width={'24'}
                                bg={'green.500'}
                                color={'white'}
                                size={'sm'}
                            >
                                <CardBody>
                                    <Center>
                                        <Text>{name}</Text>
                                    </Center>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                </HStack>
                <Box py={'5'}>
                    <LessonsCard
                        height={'24'}
                        title="Math"
                        description="Math description"
                    />
                </Box>
            </Box>
        </Box>
    );
}
