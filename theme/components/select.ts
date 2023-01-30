import { PartsStyleObject } from '@chakra-ui/react';
import { selectAnatomy as parts } from '@chakra-ui/anatomy';
import { Input } from './input';

const baseStyle: PartsStyleObject<typeof parts> = {
    field: { ...Input.baseStyle.field },
};

export const Select = {
    parts: parts.keys,
    baseStyle,
    defaultProps: Input.defaultProps,
};
