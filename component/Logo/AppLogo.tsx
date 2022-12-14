import { Divider, Flex, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/fav.svg';
type LogoProps = {
    width?: number;
    height?: number;
};

export function AppLogo({ width = 100, height = 100 }: LogoProps) {
    return (
        <Link href={'/'}>
            <Flex flexDir={'column'} alignItems={'center'}>
                <Image
                    src={Logo}
                    alt={'de base'}
                    width={width}
                    height={height}
                />
                <Text color={'green.500'}>De base</Text>
            </Flex>
        </Link>
    );
}
