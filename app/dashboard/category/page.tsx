'use client';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    useDisclosure,
} from '@chakra-ui/react';
import AddLessonCategory from 'component/modal/AddLessonCategory';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { GetCategory } from 'api/GetCategory';

export default function Category() {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { data, isError, isLoading } = useQuery('category', GetCategory);

    if (isError) {
        return <Heading>An Error has Occured</Heading>;
    }

    if (isLoading) {
        return <Heading>Loading ...</Heading>;
    }

    return (
        <Box p={'5'}>
            <Flex justifyContent={'flex-end'}>
                <Button
                    colorScheme={'green'}
                    onClick={onOpen}
                    leftIcon={<Icon as={PlusIcon} color={'white'} />}
                >
                    Add Category
                </Button>
            </Flex>
            <SimpleGrid my={'5'} columns={2} spacing={10}>
                {data.map(
                    (category: {
                        id: string;
                        name: string;
                        description: string;
                    }) => (
                        <Card bgColor={'white'} key={category.id}>
                            <CardHeader>
                                <Heading size="md" textTransform={'uppercase'}>
                                    {category.name}
                                </Heading>
                            </CardHeader>
                            <Divider></Divider>
                            <CardBody>{category.description}</CardBody>
                        </Card>
                    )
                )}
            </SimpleGrid>

            <AddLessonCategory isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}
