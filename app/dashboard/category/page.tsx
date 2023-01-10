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
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Spinner,
    useDisclosure,
} from '@chakra-ui/react';
import AddLessonCategory from 'component/modal/AddLessonCategory';
import {
    PlusIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { GetCategory } from 'api/lessoncategory/GetCategory';
import { CustomIcon } from 'component/commons/icons/icon';

export type CategoryResponse = {
    id: string;
    name: string;
    description: string;
};

function CardMenu() {
    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        opacity={isOpen ? '1' : '0' || '0'}
                        _groupHover={{
                            opacity: `${(isOpen && '1') || '1'}`,
                        }}
                        as={IconButton}
                        aria-label="Options"
                        icon={
                            <CustomIcon
                                icon={EllipsisVerticalIcon}
                                color={'gray.700'}
                            />
                        }
                        variant="outline"
                    />
                    <MenuList alignItems={'center'}>
                        <MenuItem
                            icon={
                                <Icon
                                    as={PencilSquareIcon}
                                    boxSize={'5'}
                                    color={'gray.700'}
                                />
                            }
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            role={'group'}
                            _groupHover={{ color: 'red.500' }}
                            icon={
                                <Icon
                                    as={TrashIcon}
                                    boxSize={'5'}
                                    color={'gray.700'}
                                    _groupHover={{ color: 'red.500' }}
                                />
                            }
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </>
            )}
        </Menu>
    );
}

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
                    <Card
                        role={'group'}
                        bgColor={'white'}
                        key={category.id}
                        shadow={'lg'}
                    >
                        <CardHeader>
                            <Flex
                                alignItems={'center'}
                                justifyContent={'space-between'}
                            >
                                <Heading size="md" textTransform={'uppercase'}>
                                    {category.name}
                                </Heading>

                                <CardMenu />
                            </Flex>
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
