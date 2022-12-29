'use client';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Divider,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Spinner,
    useDisclosure,
} from '@chakra-ui/react';
import AddLessonCategory from 'component/modal/AddLessonCategory';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { GetCategory } from 'api/lessoncategory/GetCategory';

export type CategoryResponse = {
    id: string;
    name: string;
    description: string;
};

export default function Category() {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { data, isError, isLoading } = useQuery('category', GetCategory);

    if (isError) {
        return (
            <Center>
                <Heading>An Error has Occured</Heading>
            </Center>
        );
    }

    if (isLoading) {
        return (
            <Flex
                sx={{ height: '100vh' }}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Spinner color="green.500" />
            </Flex>
        );
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
                {data?.map((category: CategoryResponse) => (
                    <Card bgColor={'white'} key={category.id}>
                        <CardHeader>
                            <Heading size="md" textTransform={'uppercase'}>
                                {category.name}
                            </Heading>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>{category.description}</CardBody>
                    </Card>
                ))}
            </SimpleGrid>

            <AddLessonCategory isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}
