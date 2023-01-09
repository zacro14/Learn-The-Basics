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
    }),
};

const themeOvirrides: Partial<ChakraTheme> = {
    components,
    styles,
    ...foundations,
};
const theme = extendTheme({
    fonts: {
        heading: `'Opens Sans', sans-serif`,
        body: `'Poppins', 'sans-serif'`,
    },
    ...themeOvirrides,
});

export default theme;
