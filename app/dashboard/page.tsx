'use client';
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';

export default function Dashboard() {
    const items = [
        {
            count: 11,
            description: 'New Post',
        },
    ];
    return (
        <Box sx={{ minHeight: '100vh' }} p={'5'}>
            <SimpleGrid columns={2} spacing={10}>
                {items.map(({ description, count }, index) => (
                    <Card key={index} bgColor={'white'}>
                        <CardHeader fontSize={'5xl'} fontWeight={'extrabold'}>
                            {count}
                        </CardHeader>
                        <CardBody>
                            <Text>{description}</Text>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
}

Dashboard.auth = {
    role: 'TEACHER',
    unauthorized: '/',
};
