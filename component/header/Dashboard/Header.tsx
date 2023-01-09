import {
    Avatar,
    Box,
    Button,
    Divider,
    Heading,
    Icon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import {
    ArrowRightOnRectangleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { ApiClientPrivate } from 'lib/axios/Api';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export function DashboardHeader() {
    const { data: session } = useSession();

    const handleSignout = async () => {
        const { status } = await ApiClientPrivate.get('/auth/logout');
        if (status === 200) {
            return signOut({
                callbackUrl: '/auth/sign-in',
            });
        }

        return;
    };
    return (
        <Box
            as="header"
            pos={'fixed'}
            top="0"
            h="16"
            w="full"
            bgColor={'white'}
            boxShadow="sm"
            display={'flex'}
            alignItems="center"
            px="10"
            justifyContent={'space-between'}
            zIndex={'2'}
        >
            <Heading>
                <Link href={'/'}>LTB</Link>
            </Heading>
            <Menu>
                <MenuButton>
                    <Avatar cursor={'pointer'} name={session?.user.username} />
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<Icon as={UserIcon} boxSize={6} />}>
                        Account
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                        onClick={handleSignout}
                        icon={
                            <Icon as={ArrowRightOnRectangleIcon} boxSize={6} />
                        }
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}
