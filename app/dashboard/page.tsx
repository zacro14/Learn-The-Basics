'use client'
import { Box, Text } from '@chakra-ui/react'

export default function Dashboard() {
    return (
        <Box sx={{ minHeight: '100vh' }} bgColor="gray.100">
            {Array.apply(0, Array(50)).map(function (x, i) {
                return <Text key={i}>Helo helo</Text>
            })}
        </Box>
    )
}
