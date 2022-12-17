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
import { AppHeader } from 'component/header/AppHeader';
import Link from 'next/link';

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
            <Container p={'5'}>
                <HStack>
                    {Categories.map(({ name }, i) => (
                        <Card
                            key={i}
                            width={'24'}
                            bg={'green.500'}
                            color={'white'}
                            size={'sm'}
                        >
                            <CardBody>
                                <Center>
                                    <Text>
                                        <Link href={`/category/${name}`}>
                                            {name}
                                        </Link>
                                    </Text>
                                </Center>
                            </CardBody>
                        </Card>
                    ))}
                </HStack>
            </Container>
        </Box>
    );
}
