import { ComponentDefaultProps } from '@chakra-ui/react';
import { CSSObject } from '@emotion/react';

const baseStyle: Record<string, CSSObject> = {
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
};
const defaultProps: ComponentDefaultProps = {
    size: 'md',
    variant: 'outline',
};
const variants = {
    outline: {
        borderColor: 'gray.300',
        _hover: {
            borderColor: 'gray.500',
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

export const Textarea = {
    baseStyle,
    variants,
    defaultProps,
};
