'use client';
import {
    Card,
    CardBody,
    Container,
    Stack,
    Text,
    Box,
    HStack,
    Center,
} from '@chakra-ui/react';
import { AppHeader } from 'component/Header/AppHeader';

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
                                    <Text>{name}</Text>
                                </Center>
                            </CardBody>
                        </Card>
                    ))}
                </HStack>
            </Container>
        </Box>
    );
}
