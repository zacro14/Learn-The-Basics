'use client';
import { Box } from '@chakra-ui/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
export default function Lessons() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
    });
    return (
        <Box p={'5'}>
            <EditorContent editor={editor}></EditorContent>
        </Box>
    );
}
