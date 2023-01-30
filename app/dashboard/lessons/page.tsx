'use client';
import {
    Container,
    Heading,
    Select,
    Card,
    Box,
    FormControl,
    FormLabel,
    Stack,
} from '@chakra-ui/react';
import { Editor } from 'component/editor';
import { TCategoryData } from 'component/modal/category';
import { useQuery } from 'react-query';
import { GetCategory } from 'service/lessoncategory/fetchCategory';
import { CategoryResponse } from '../category/page';

function SelectionCategory() {
    const { data, isError, isLoading } = useQuery('category', GetCategory);
    return (
        <Select maxW={'container.sm'} textTransform={'capitalize'}>
            {data?.map((category: CategoryResponse) => (
                <option key={category.id}>{category.name}</option>
            ))}
        </Select>
    );
}
export default function Lessons() {
    return (
        <Box as={Card} mx={'16'} mt={10} p={'5'} bgColor={'white'}>
            <Heading my={'5'} fontSize={'xl'}>
                Create Lessons
            </Heading>
            <Stack pl={'10'}>
                <FormControl>
                    <FormLabel>Select Lesson Category</FormLabel>
                    <SelectionCategory />
                </FormControl>

                <FormControl>
                    <FormLabel>Input the Question</FormLabel>
                    <Editor />
                </FormControl>
            </Stack>
        </Box>
    );
}
