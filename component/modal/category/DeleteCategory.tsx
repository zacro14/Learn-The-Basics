import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useToast,
} from '@chakra-ui/react';
import { ApiClientPrivate } from 'lib/axios/Api';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryResponse } from 'app/dashboard/category/page';

type Props = {
    onClose: () => void;
    isOpen: boolean;
    cancelRef: any;
    data: CategoryResponse | undefined;
};
export function DeleteModal({ onClose, isOpen, cancelRef, data }: Props) {
    const toast = useToast();
    const query = useQueryClient();
    const mutation = useMutation(
        () => {
            return ApiClientPrivate.delete(`/category/${data?.id}`);
        },
        {
            onSuccess: () => {
                query.invalidateQueries('category');
                toast({
                    title: 'Category Deleted.',
                    description: 'SuccessFully deleted the category',
                    status: 'success',
                    isClosable: true,
                });
                onClose();
            },
            onError: (error) => {
                toast({
                    title: 'Category Deleted.',
                    description: `${error}`,
                    status: 'error',
                    isClosable: true,
                });
            },
        }
    );

    const handleDeleteCategory = () => {
        mutation.mutate();
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Category
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can&apos;t undo this action
                        afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            isLoading={mutation.isLoading}
                            onClick={handleDeleteCategory}
                            colorScheme="red"
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
