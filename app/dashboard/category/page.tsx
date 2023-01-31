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
    useDisclosure,
} from '@chakra-ui/react';
import {
    PlusIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { GetCategory } from 'service/lessoncategory/fetchCategory';
import { CustomIcon } from 'component/commons/icons/icon';
import { Loading } from 'component/loading';
import CategoryModal from 'component/modal/category/EditCategory';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { AddLessonCategory, DeleteModal } from 'component/modal/category';
import { FocusableElement } from '@chakra-ui/utils';

export type CategoryResponse = {
    id: string;
    name: string;
    description: string;
};

type TCardMenu = {
    onOpen: () => void;
    onOpenDeleteModal: () => void;
    setSelectedCategory: Dispatch<SetStateAction<CategoryResponse | undefined>>;
    data:
        | {
              id: string;
              name: string;
              description: string;
          }
        | undefined;
};

function CardMenu({
    data,
    onOpen,
    onOpenDeleteModal,
    setSelectedCategory,
}: TCardMenu) {
    const handleEditCategory = () => {
        setSelectedCategory(data);
        onOpen();
    };

    const handleDeleteCategory = () => {
        setSelectedCategory(data);
        onOpenDeleteModal();
    };
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
                            onClick={handleEditCategory}
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
                            onClick={handleDeleteCategory}
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
    const {
        onClose: onCloseEditModal,
        onOpen: onOpenEditModal,
        isOpen: isOpenEditModal,
    } = useDisclosure();
    const {
        onClose: onCloseDeleteModal,
        onOpen: onOpenDeleteModal,
        isOpen: isOpenDeleteModal,
    } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<
        CategoryResponse | undefined
    >(undefined);

    const { data, isError, isLoading } = useQuery('category', GetCategory);
    const cancelRef = useRef<HTMLButtonElement | FocusableElement | null>(null);

    if (isError) {
        return (
            <Center>
                <Heading>An Error has Occured</Heading>
            </Center>
        );
    }

    if (isLoading) {
        return <Loading />;
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

                                <CardMenu
                                    onOpenDeleteModal={onOpenDeleteModal}
                                    data={category}
                                    setSelectedCategory={setSelectedCategory}
                                    onOpen={onOpenEditModal}
                                />
                            </Flex>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody>{category.description}</CardBody>
                    </Card>
                ))}
            </SimpleGrid>

            <AddLessonCategory isOpen={isOpen} onClose={onClose} />
            <CategoryModal
                data={selectedCategory}
                isOpen={isOpenEditModal}
                onClose={onCloseEditModal}
            />
            <DeleteModal
                data={selectedCategory}
                cancelRef={cancelRef}
                isOpen={isOpenDeleteModal}
                onClose={onCloseDeleteModal}
            />
        </Box>
    );
}
