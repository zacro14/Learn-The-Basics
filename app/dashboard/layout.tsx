'use client'
import { Box } from '@chakra-ui/react'

export default function DashboardLayout() {
    return (
        <Box bgColor={'gray.100'} position="relative">
            <Box
                position={'fixed'}
                as="nav"
                w="80"
                h="container.xl"
                bgColor={'white'}
                boxShadow="md"
            >
                <VStack alignItems={'start'} p="5">
                    <UnorderedList>
                        <ListItem>Dashboard</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                    </UnorderedList>
                </VStack>
            </Box>
        </Box>
    )
}
