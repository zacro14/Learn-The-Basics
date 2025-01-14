import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Blockquote from '@tiptap/extension-blockquote';
import Underline from '@tiptap/extension-underline';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import {
    Editor,
    Editor as TiptapEditor,
    EditorContent,
    PureEditorContent,
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

type EditorMenu = {
    editor: TiptapEditor | null;
};

function EditMenu({ editor }: EditorMenu) {
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
            heading: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            link: () => {
                const prevUrl = editor.getAttributes('link').href;
                const url = window.prompt('URL', prevUrl);

                if (url === '') {
                    editor
                        .chain()
                        .focus()
                        .extendMarkRange('link')
                        .unsetLink()
                        .run();
                }
                if (url) {
                    editor
                        .chain()
                        .focus()
                        .extendMarkRange('link')
                        .setLink({ href: url })
                        .run();
                }
            },
            code: () => editor.chain().toggleCodeBlock().run(),
            qoute: () => editor.chain().focus().toggleBlockquote().run(),
            underline: () => editor.chain().toggleUnderline().run(),
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

type EditorProps = {
    isEditable?: boolean;
    name: string;
    setValue: (fieldName: any, value: any) => void;
    register: any;
    getValues: any;
};

export const TipTapEditor = ({
    isEditable = true,
    register,
    setValue,
    name,
    getValues,
}: EditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your content here...',
            }),
            Link.configure({
                openOnClick: false,
            }),
            Underline,
        ],
        content: getValues ? getValues : '',
        editable: isEditable,
        editorProps: {
            attributes: {
                class: 'min-heigth: 50rem',
            },
        },
        onUpdate({ editor }) {
            const data = editor?.getJSON();
            setValue(name, data);
        },
    });

    return (
        <Box rounded={'md'} minH={'40'}>
            {isEditable && <EditMenu editor={editor} />}
            <EditorContent editor={editor} spellCheck={false} {...register} />
        </Box>
    );
};
