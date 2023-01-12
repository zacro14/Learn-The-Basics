import { ComponentStyleConfig, SystemStyleObject } from '@chakra-ui/react';

const baseStyle: SystemStyleObject = {
    fontWeight: '500',
    letterSpacing: 'wide',
    py: 2,
    px: 5,
    _focusVisible: {
        boxShadow: 'focusRing.orange',
    },
    _hover: {
        color: 'white',
    },
};

const variants: SystemStyleObject = {
    'primary-outline': {
        borderWidth: '2px',
        borderColor: 'green.500',
        bg: 'transparent',
        color: 'green.500',

        _hover: {
            color: 'green.500',
        },
    },
    base: {
        rounded: 'base',
        bg: 'green.500',
        color: 'white',
        _hover: {
            bg: 'green.600',
        },
    },
};

export const Button: ComponentStyleConfig = {
    baseStyle,
    variants,
};
