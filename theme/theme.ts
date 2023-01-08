import { ChakraTheme, extendTheme } from '@chakra-ui/react';
import components from './components';
import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
    global: (props) => ({
        shadows: {
            outline: '0 0 0 1px green.500',
        },
    }),
};

const themeOvirrides: Partial<ChakraTheme> = {
    components,
    styles,
};
const theme = extendTheme({
    fonts: {
        heading: `'Opens Sans', sans-serif`,
        body: `'Poppins', 'sans-serif'`,
    },
    ...themeOvirrides,
});

export default theme;
