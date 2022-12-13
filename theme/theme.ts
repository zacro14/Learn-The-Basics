import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `'Opens Sans', sans-serif`,
        body: `'Poppins', 'sans-serif'`,
    },
    styles: {
        shadows: {
            outline: '0 0 0 1px #E53E3E',
        },
    },
    components: {
        Input: {
            variants: {
                outline: {
                    field: {
                        _focus: {
                            borderColor: 'green.500',
                            boxShadow: '0 0 0 1px green.500',
                        },
                    },
                },
                filled: {
                    field: {
                        _focus: {
                            borderColor: 'green.500',
                            boxShadow: '0 0 0 1px green.500',
                        },
                    },
                },
            },
        },
    },
});

export default theme;
