import {
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CategoryResponse } from 'app/dashboard/category/page';
import { AxiosError } from 'axios';
import { ApiClientPrivate } from 'lib/axios/Api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { schema, TCategoryData } from './AddLessonCategory';

type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};
export default function CategoryModal({
    isOpen,
    onClose,
    children,
    title,
}: ModalProps) {
    const toast = useToast();
    const query = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const mutation = useMutation(
        (categorydata: TCategoryData) => {
            return ApiClientPrivate.patch<CategoryResponse>(
                `/category/${categorydata.id}`,
                categorydata
            );
        },
        {
            onError: (error: AxiosError) => {
                toast({
                    title: `Error `,
                    description: `${error.response?.statusText}`,
                    status: 'error',
                    isClosable: true,
                });
            },
            onSuccess() {
                query.invalidateQueries('category');
                toast({
                    title: `Success`,
                    description: 'Sucessfully added a new lesson category',
                    status: 'success',
                    isClosable: true,
                });
                onClose();
            },
        }
    );

    const onSubmit = handleSubmit((data) => mutation.mutate(data));

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={onSubmit}>
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Container>
                            <FormControl isInvalid={errors.name && true}>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    placeholder=" eg. math"
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <FormErrorMessage>
                                        {errors.name?.message}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={errors.description && true}>
                                <FormLabel>Decription</FormLabel>
                                <Textarea
                                    size={'lg'}
                                    placeholder=" category description"
                                    {...register('description')}
                                />
                                {errors.description && (
                                    <FormErrorMessage>
                                        {errors.description.message}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            mr={3}
                            loadingText={'loading'}
                            type={'submit'}
                        >
                            Edit
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
