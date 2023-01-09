import { Icon } from '@chakra-ui/react';

type IconProps = {
    color?: string;
    boxSize?: string | number;
    icon: any;
};

export function CustomIcon({
    boxSize = '5',
    icon,
    color = 'green.500',
}: IconProps) {
    return <Icon as={icon} color={color} boxSize={boxSize} />;
}
