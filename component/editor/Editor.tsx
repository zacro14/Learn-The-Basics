import Placeholder from '@tiptap/extension-placeholder';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import {
    Editor as TiptapEditor,
    EditorContent,
    useEditor,
} from '@tiptap/react';
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
import { useState } from 'react';

type EditorProps = {
    editor: TiptapEditor | null;
};

function EditMenu({ editor }: EditorProps) {
    // here we return null if no intance of the editor
    if (!editor) return null;

    const Icons = [
        { icon: <FaBold />, label: 'bold', name: 'bold' },
        { icon: <FaItalic />, label: 'italic', name: 'italic' },
        { icon: <FaListOl />, label: 'ordered list', name: 'ol' },
        { icon: <FaListUl />, label: 'unordered list', name: 'ul' },
        { icon: <FaHeading />, label: 'heading', name: 'heading' },
        { icon: <FaLink />, label: 'link', name: 'link' },
        { icon: <FaCode />, label: 'code', name: 'code' },
        { icon: <FaQuoteLeft />, label: 'qoute', name: 'qoute' },
        { icon: <FaUnderline />, label: 'underline', name: 'underline' },
    ];

    const handleCommand = (name: string) => {
        const commands: { [key: string]: () => void } = {
            bold: () => editor.chain().toggleBold().run(),
            italic: () => editor.chain().focus().toggleItalic().run(),
            ol: () => editor.chain().toggleOrderedList().run(),
            ul: () => editor.chain().toggleBulletList().run(),
        };

        if (commands[name]) {
            commands[name]();
        }
    };

    return (
        <Box bgColor={'gray.50'} p={'3'}>
            {Icons.map(({ icon, label, name }, i) => (
                <Tooltip key={i} label={label} rounded={'md'}>
                    <span>
                        <IconButton
                            mr={'1'}
                            isActive={editor.isActive(name) ? true : false}
                            onClick={() => handleCommand(name)}
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
            <EditMenu editor={editor} />
            <EditorContent editor={editor} />
        </Box>
    );
};
