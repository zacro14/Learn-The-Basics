'use client';
import {
    Container,
    Heading,
    Select,
    Card,
    FormControl,
    FormLabel,
    Stack,
    Button,
    HStack,
    Center,
    Textarea,
    Popover,
    Input,
    List,
    useDisclosure,
    ListItem,
    PopoverContent,
    PopoverTrigger,
    PopoverAnchor,
} from '@chakra-ui/react';
import { Editor } from 'component/editor';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
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

function Tags(register: any) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [tag, setTagValue] = useState<string>();
    const options = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

    const handleOptionSelect = (option: string) => {
        setTagValue(option);
        onClose();
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTagValue(event.target.value);
        onOpen();
    };

    return (
        <Popover isOpen={isOpen}>
            <PopoverAnchor>
                <PopoverTrigger>
                    <Input
                        value={tag}
                        onChange={handleChange}
                        // {...register('tag')}
                        placeholder={'Add  tags..'}
                    />
                </PopoverTrigger>
            </PopoverAnchor>
            <PopoverContent>
                <List>
                    {options.map((option) => (
                        <ListItem
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </ListItem>
                    ))}
                </List>
            </PopoverContent>
        </Popover>
    );
}
export default function Lessons() {
    const { register, setValue, control } = useForm();
    const [title, setTitleValue] = useState<string>('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
        }
    }, [title]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitleValue(e.target.value);
        setValue('title', e.target.value);
    };

    return (
        <Center>
            <Container as={Card} mx={'16'} mt={10} p={'5'} bgColor={'white'}>
                <Heading my={'5'} fontSize={'xl'}>
                    Create Lessons
                </Heading>
                <Stack spacing={'10'}>
                    <FormControl>
                        <FormLabel>Select Lesson Category</FormLabel>
                        <SelectionCategory />
                    </FormControl>

                    <FormControl>
                        <Textarea
                            ref={(el) => {
                                textareaRef.current = el;
                                register('title');
                            }}
                            onChange={handleChange}
                            value={title}
                            whiteSpace={'pre-wrap'}
                            fontSize={'3xl'}
                            _placeholder={{ color: 'black' }}
                            variant={'unstyled'}
                            placeholder="New Post Title here..."
                            minH={'24px'}
                            resize={'none'}
                        />
                    </FormControl>

                    <FormControl>
                        <Tags register={register} />
                    </FormControl>

                    <FormControl>
                        <Editor />
                    </FormControl>
                    <HStack>
                        <Button variant={'base'}>Publish</Button>
                        <Button variant={'ghost'}>Save draft</Button>
                    </HStack>
                </Stack>
            </Container>
        </Center>
    );
}
