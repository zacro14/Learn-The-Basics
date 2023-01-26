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
import { AxiosError, AxiosResponse } from 'axios';
import { ApiClientPrivate } from 'lib/axios/Api';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';

export type TAddLessonProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
};

export type TCategoryData = {
    id?: string;
    name: string;
    description: string;
};

export const schema = yup.object({
    name: yup.string().required('lesson category title is required'),
    description: yup
        .string()
        .required('lesson description is required')
        .max(300, ' please only 300 max characters ')
        .min(5, 'min  of 5 characters'),
});

export function AddLessonCategory({
    isOpen,
    onClose,
    title = 'Add Lesson Category',
}: TAddLessonProps) {
    const toast = useToast();
    const query = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCategoryData>({ resolver: yupResolver(schema) });

    const mutation = useMutation(
        (categorydata: TCategoryData) => {
            return ApiClientPrivate.post<CategoryResponse>(
                '/category/create',
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
            <form onSubmit={onSubmit}>
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
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
                            isLoading={mutation.isLoading}
                            loadingText={'loading'}
                            type={'submit'}
                        >
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
}
