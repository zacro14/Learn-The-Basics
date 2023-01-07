'use client';
import { Container, Heading } from '@chakra-ui/react';
import { Editor } from 'component/editor';
export default function Lessons() {
    return (
        <Container p={'5'}>
            <Heading my={'5'}>Create Lessons</Heading>
            <Editor />
        </Container>
    );
}
