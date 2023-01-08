'use client';
import {
    Card,
    CardBody,
    Text,
    Box,
    HStack,
    Center,
    Skeleton,
} from '@chakra-ui/react';
import { LessonsCard } from 'component/card';
import { AppHeader } from 'component/header/AppHeader';
import { useLessonCategory } from 'hooks/lessoncategory/useLessonCategory';
import Link from 'next/link';
import { CategoryResponse } from './dashboard/category/page';

export default function Home() {
    const { data, isError, isLoading } = useLessonCategory();
    return (
        <Box bgColor={'gray.50'}>
            <AppHeader />
            <Box p={'5'} mx={'24'}>
                <HStack>
                    {data?.map(({ name, id }: CategoryResponse) => (
                        <Skeleton key={id} isLoaded={!isLoading}>
                            <Link href={`/category/${name}`}>
                                <Card
                                    width={'24'}
                                    bg={'green.500'}
                                    color={'white'}
                                    size={'sm'}
                                >
                                    <CardBody>
                                        <Center>
                                            <Text>{name}</Text>
                                        </Center>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Skeleton>
                    ))}
                </HStack>
                <Box py={'5'}>
                    <Skeleton isLoaded={true}>
                        <LessonsCard
                            height={'24'}
                            title="Math"
                            description="Math description"
                        />
                    </Skeleton>
                </Box>
            </Box>
        </Box>
    );
}
