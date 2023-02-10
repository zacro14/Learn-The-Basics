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
    Flex,
    Badge,
    Box,
} from '@chakra-ui/react';
import { TipTapEditor } from 'component/editor';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { GetCategory } from 'service/lessoncategory/fetchCategory';
import { CategoryResponse } from '../category/page';

function SelectionCategory({ register }: any) {
    const { data, isError, isLoading } = useQuery('category', GetCategory);
    return (
        <Select
            maxW={'container.sm'}
            textTransform={'capitalize'}
            {...register}
        >
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
                        onChange={handleChange}
                        {...register}
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
    const { register, setValue, handleSubmit, getValues } = useForm();
    const [title, setTitleValue] = useState<string>('');
    const [isEditorEditable, setEditorEditable] = useState(true);
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

    const handlePreview = () => {
        setEditorEditable(false);
    };

    const handleEdit = () => {
        setEditorEditable(true);
    };
    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <Center display={'flex'} flexDirection={'column'} mx={'16'}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ minHeight: '100vh' }}
            >
                <Flex justifyContent={'space-between'} py={'5'} width={'full'}>
                    <Heading my={'5'} fontSize={'xl'}>
                        Create Lessons
                    </Heading>
                    <HStack>
                        <Button
                            variant={'ghost'}
                            fontWeight={'bold'}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button variant={'ghost'} onClick={handlePreview}>
                            Preview
                        </Button>
                    </HStack>
                </Flex>

                <Container
                    sx={{
                        height: 'calc(100vh - 250px)',
                    }}
                    as={Card}
                    p={'5'}
                    bgColor={'white'}
                    width={'full'}
                >
                    <Stack spacing={'10'}>
                        {isEditorEditable ? (
                            <>
                                <FormControl>
                                    <FormLabel>
                                        Select Lesson Category
                                    </FormLabel>
                                    <SelectionCategory
                                        register={register('subject')}
                                    />
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

                                {/* <FormControl>
                                    <Tags register={register('tag')} />
                                </FormControl> */}

                                <FormControl>
                                    <TipTapEditor
                                        getValues={getValues('content')}
                                        register={register('content')}
                                        setValue={setValue}
                                        name={'content'}
                                        isEditable={isEditorEditable}
                                    />
                                </FormControl>
                            </>
                        ) : (
                            <Box width={'container.lg'}>
                                <Box>
                                    <Badge variant={'solid'}>
                                        {getValues('subject')}
                                    </Badge>
                                </Box>

                                <Heading>{getValues('title')}</Heading>

                                <TipTapEditor
                                    getValues={getValues('content')}
                                    register={register('content')}
                                    setValue={setValue}
                                    name={'content'}
                                    isEditable={isEditorEditable}
                                />
                            </Box>
                        )}
                    </Stack>
                </Container>
                <Box p={'5'}>
                    <HStack>
                        <Button variant={'base'}>Publish</Button>
                        <Button variant={'ghost'} type={'submit'}>
                            Save draft
                        </Button>
                    </HStack>
                </Box>
            </form>
        </Center>
    );
}
