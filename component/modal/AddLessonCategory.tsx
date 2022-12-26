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
import { ApiClientPrivate } from 'lib/axios/Api';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

type TAddLessonProps = {
    isOpen: boolean;
    onClose: () => void;
};

type TCategoryData = {
    name: string;
    description: string;
};

const schema = yup.object({
    name: yup.string().required('lesson category title is required'),
    description: yup.string().required('lesson description is required'),
});

export default function AddLessonCategory({
    isOpen,
    onClose,
}: TAddLessonProps) {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCategoryData>({ resolver: yupResolver(schema) });

    const mutation = useMutation((categorydata: TCategoryData) => {
        return ApiClientPrivate.post('/category/create', categorydata);
    });

    if (mutation.isError) {
        toast({
            title: `Error Adding Category`,
            status: 'error',
            isClosable: true,
        });
    }

    if (mutation.isSuccess) {
        toast({
            title: `Sucessfully Added`,
            status: 'success',
            isClosable: true,
        });
        onClose();
    }

    const onSubmit = handleSubmit((data) => mutation.mutate(data));

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={onSubmit}>
                <ModalContent>
                    <ModalHeader>Add Lesson Category</ModalHeader>
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
