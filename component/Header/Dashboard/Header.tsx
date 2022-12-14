import {
    Avatar,
    Box,
    Divider,
    Heading,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import {
    ArrowRightOnRectangleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function DashboardHeader() {
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
        >
            <Heading>LTB</Heading>
            <Menu>
                <MenuButton>
                    <Avatar cursor={'pointer'} name="Dan Abrahmov" />
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<Icon as={UserIcon} boxSize={6} />}>
                        Account
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        icon={
                            <Icon as={ArrowRightOnRectangleIcon} boxSize={6} />
                        }
                    >
                        <Link href={'/'}>Logout</Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}
