import { PartsStyleObject } from '@chakra-ui/react';
import { inputAnatomy as parts } from '@chakra-ui/anatomy';

//Note: check this for fixing input ovirrides https://github.com/chakra-ui/chakra-ui/issues/7203
const baseStyle: PartsStyleObject<typeof parts> = {
    field: {
        _placeholder: {
            color: 'gray.800',
        },
        _hover: {
            borderColor: 'green.500',
        },
        _focus: {
            borderColor: 'green.500',
            boxShadow: 'none !important',
        },
        _focusVisible: {
            borderColor: 'green.500',
            boxShadow: 'none !important',
        },
    },
};

const defaultProps = {
    variant: 'outline',
};
const variants = {
    outline: {
        field: {
            _placeholder: {
                color: 'gray.800',
            },
            _hover: {
                borderColor: 'green.500',
            },
            _focus: {
                borderColor: 'green.500',
                boxShadow: 'none !important',
            },
            _focusVisible: {
                borderColor: 'green.500',
                boxShadow: 'none !important',
            },
        },
    },
};

export const Input = {
    parts: parts.keys,
    variants,
    baseStyle,
    defaultProps,
};
