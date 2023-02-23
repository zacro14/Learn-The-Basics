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
    useToast,
    FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { TipTapEditor } from 'component/editor';
import { ApiClientPrivate } from 'lib/axios/Api';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { GetCategory } from 'service/lessoncategory/fetchCategory';
import { lessonschema } from 'utils/validation_schema';
import { CategoryResponse } from '../category/page';
import * as yup from 'yup';

function SelectionCategory({ register }: any) {
    const { data, isError, isLoading } = useQuery('category', GetCategory);
    return (
        <Select
            maxW={'container.sm'}
            textTransform={'capitalize'}
            {...register}
        >
            {data?.map((category: CategoryResponse) => (
                <option
                    style={{ textTransform: 'capitalize' }}
                    key={category.id}
                >
                    {category.name}
                </option>
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

type FormData = yup.InferType<typeof lessonschema>;

export default function Lessons() {
    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(lessonschema),
    });
    const [title, setTitleValue] = useState<string>('');
    const [isEditorEditable, setEditorEditable] = useState(true);
    const [isDraft, setIsDraft] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const toast = useToast();

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

    const mutation = useMutation(
        (lesson: FormData) => {
            return ApiClientPrivate.post('/lesson', lesson);
        },
        {
            onSuccess() {
                toast({
                    title: `Success`,
                    description: 'Sucessfully added a new lesson',
                    status: 'success',
                    isClosable: true,
                });
            },
            onError: (error: AxiosError) => {
                toast({
                    title: `Error `,
                    description: `${error.response?.statusText}`,
                    status: 'error',
                    isClosable: true,
                });
            },
        }
    );
    const onSubmit = (data: FormData) => {
        data.isDraft = isDraft;
        mutation.mutate(data);
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
                                <FormControl
                                    isInvalid={
                                        errors.subject?.message ? true : false
                                    }
                                >
                                    <FormLabel>
                                        Select Lesson Category
                                    </FormLabel>
                                    <SelectionCategory
                                        register={register('subject')}
                                    />
                                    <FormErrorMessage>
                                        {errors.subject?.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isInvalid={
                                        errors.title?.message ? true : false
                                    }
                                >
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
                                    <FormErrorMessage>
                                        {errors.title?.message}
                                    </FormErrorMessage>
                                </FormControl>

                                {/* <FormControl>
                                    <Tags register={register('tag')} />
                                </FormControl> */}

                                <FormControl
                                    isInvalid={
                                        errors.content?.message ? true : false
                                    }
                                >
                                    <TipTapEditor
                                        getValues={getValues('content')}
                                        register={register('content')}
                                        setValue={setValue}
                                        name={'content'}
                                        isEditable={isEditorEditable}
                                    />
                                    <FormErrorMessage>
                                        {errors.content?.message}
                                    </FormErrorMessage>
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
                        {mutation.isLoading ? (
                            <Button>Submitting ...</Button>
                        ) : (
                            <>
                                <Button
                                    variant={'base'}
                                    type={'submit'}
                                    onClick={() => setIsDraft(false)}
                                >
                                    Publish
                                </Button>
                                <Button
                                    variant={'ghost'}
                                    type={'submit'}
                                    onClick={() => setIsDraft(true)}
                                >
                                    Save draft
                                </Button>
                            </>
                        )}
                    </HStack>
                </Box>
            </form>
        </Center>
    );
}
