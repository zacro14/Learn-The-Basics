'use client';
import { Box, Heading, Text } from '@chakra-ui/react';

type CardProps = {
    height?: string;
    width?: string;
    title: string;
    description: string;
};

export function LessonsCard({
    height = 'sm',
    width = 'sm',
    title,
    description,
}: CardProps) {
    return (
        <Box
            height={height}
            width={width}
            boxShadow={'lg'}
            bgColor={'white'}
            rounded={'xl'}
            p={'5'}
        >
            <Heading noOfLines={1}>{title}</Heading>
            <Text>{description}</Text>
        </Box>
    );
}
