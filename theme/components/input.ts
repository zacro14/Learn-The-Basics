import { PartsStyleObject } from '@chakra-ui/react';
import { inputAnatomy as parts } from '@chakra-ui/anatomy';

const baseStyle: PartsStyleObject<typeof parts> = {
    field: {
        _placeholder: {
            color: 'gray.600',
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

export const Input = {
    parts: parts.keys,
    baseStyle,
    defaultProps,
};
