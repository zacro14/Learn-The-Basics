import { useToast, ToastProps } from '@chakra-ui/react';

type Ttoast = {
    title: string;
    status: 'loading' | 'warning' | 'success' | 'info' | 'error';
    description: string;
};
export default function useToastNotification({
    title,
    status,
    description,
}: Ttoast) {
    const toast = useToast();
    return toast({
        title: title,
        status: status,
        description: description,
    });
}
