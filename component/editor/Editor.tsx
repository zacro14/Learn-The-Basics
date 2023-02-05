import Placeholder from '@tiptap/extension-placeholder';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    FaBold,
    FaItalic,
    FaLink,
    FaListOl,
    FaListUl,
    FaHeading,
    FaQuoteLeft,
    FaCode,
    FaUnderline,
} from 'react-icons/fa';

function EditoMenu() {
    const Icons = [
        { icon: <FaBold />, label: 'bold' },
        { icon: <FaItalic />, label: 'italic' },
        { icon: <FaListOl />, label: 'ordered list' },
        { icon: <FaListUl />, label: 'unordered list' },
        { icon: <FaHeading />, label: 'heading' },
        { icon: <FaLink />, label: 'link' },
        { icon: <FaCode />, label: 'code' },
        { icon: <FaQuoteLeft />, label: 'qoute' },
        { icon: <FaUnderline />, label: 'underline' },
    ];
    return (
        <Box bgColor={'gray.50'} p={'3'}>
            {Icons.map(({ icon, label }, i) => (
                <Tooltip key={i} label={label} rounded={'md'}>
                    <span>
                        <IconButton
                            variant={'ghost'}
                            aria-label={label}
                            icon={icon}
                        />
                    </span>
                </Tooltip>
            ))}
        </Box>
    );
}

export const Editor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your content here...',
            }),
        ],
        content: '',
        editable: true,
        editorProps: {
            attributes: {
                class: 'min-heigth: 50rem',
            },
        },
    });

    return (
        <Box border={'2px'} rounded={'md'} minH={'40'}>
            <EditoMenu />
            <EditorContent editor={editor} />
        </Box>
    );
};
