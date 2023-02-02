import { Box } from '@chakra-ui/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        editable: true,
        editorProps: {
            attributes: {
                class: 'min-heigth: 50rem',
            },
        },
    });
    const json = editor?.getJSON();

    console.log(json);
    return (
        <Box border={'2px'} rounded={'md'} minH={'40'}>
            <EditorContent editor={editor} />
        </Box>
    );
};
