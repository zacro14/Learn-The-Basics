import { ChakraTheme, extendTheme } from '@chakra-ui/react';
import components from './components';
import { StyleFunctionProps, Styles, mode } from '@chakra-ui/theme-tools';
import foundations from './foundation';

const styles: Styles = {
    global: (props: StyleFunctionProps) => ({
        ':root': {
            '--borderColor': mode('gray.500', '#3F3F42')(props),
        },
        shadows: {
            outline: '0 0 0 1px green.500',
        },
        '.ProseMirror': {
            p: '3',
            minH: '20',
            '&:focus': {
                outline: 'none',
            },
            'p.is-editor-empty:first-child::before': {
                content: 'attr(data-placeholder)',
                color: 'gray.500',
                float: 'left',
                pointerEvents: 'none',
                height: 0,
            },
            a: {
                color: 'blue.500',
            },
            code: {
                bg: 'rgba(#616161, 0.1)',
                color: '#616161',
            },
            'h1, h2, h3, h4,  h5, h6 ': {
                lineHeight: '1.1',
                fontWeight: '700',
            },
            'ul, ol': {
                padding: '0 1.2rem',
            },
            blockquote: {
                pl: 4,
                borderLeft: '2px solid rgba(13, 13, 13, 0.1)',
            },
            pre: {
                fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
                background: mode('gray.900', 'blue.200')(props),
                color: mode('white', 'gray.900')(props),
                padding: '0.75rem 1rem',
                rounded: 'lg',
                whiteSpace: 'pre-wrap',
                code: {
                    color: 'inherit',
                    p: 0,
                    background: 'none',
                    fontSize: '0.8rem',
                },
                '&:focus': {
                    outline: 'none',
                },

                '.hljs-comment, .hljs-quote': {
                    color: '#616161',
                },

                '.hljs-variable, .hljs-template-variable,  .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class':
                    {
                        color: '#F98181',
                    },

                '.hljs-number,  .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal,  .hljs-type, .hljs-params':
                    {
                        color: '#FBBC88',
                    },

                '.hljs-string, .hljs-symbol, .hljs-bullet': {
                    color: '#B9F18D',
                },

                '.hljs-title, .hljs-section': {
                    color: '#FAF594',
                },

                '.hljs-keyword, .hljs-selector-tag': {
                    color: '#70CFF8',
                },

                '.hljs-emphasis': {
                    fontStyle: 'italic',
                },

                '.hljs-strong': {
                    fontWeight: 700,
                },
            },
        },
    }),
};

const themeOverrides: Partial<ChakraTheme> = {
    components,
    styles,
    ...foundations,
};
const theme = extendTheme({
    fonts: {
        heading: `'Opens Sans', sans-serif`,
        body: `'Poppins', 'sans-serif'`,
    },
    ...themeOverrides,
});

export default theme;
