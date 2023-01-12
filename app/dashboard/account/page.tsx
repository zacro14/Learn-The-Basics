'use client';
import {
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
} from '@chakra-ui/react';
import { Loading } from 'component/loading';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { fetchUser } from 'service/user/fetchUser';

export default function Account() {
    const { data: session } = useSession();
    const userId = session?.user.id;
    const { data, isError, isLoading } = useQuery(['user', userId], () =>
        fetchUser(userId)
    );

    if (isError) {
        return <Heading>Error</Heading>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box p={'5'} maxWidth={'2xl'}>
            <form>
                <Heading fontSize={'2xl'}>My Profile</Heading>
                <Stack spacing={'5'} my={'5'}>
                    <Avatar size={'lg'} name={data?.username} />
                    <FormControl>
                        <FormLabel fontWeight={800}>Username</FormLabel>
                        <Input value={session?.user.username} />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight={800}>Email</FormLabel>
                        <Input value={data?.email} />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight={800}>First Name</FormLabel>
                        <Input value={data?.firstname} />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight={800}>Last Name</FormLabel>
                        <Input value={data?.lastname} />
                    </FormControl>
                </Stack>
                <Button variant={'base'} type="submit" fontWeight={'semibold'}>
                    Update
                </Button>
            </form>
        </Box>
    );
}
