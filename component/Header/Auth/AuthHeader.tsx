import { Container, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import { AppLogo } from 'component/Logo';

export function AuthHeader() {
    return (
        <Container>
            <Heading fontSize={'lg'} p={'5'}>
                <AppLogo />
            </Heading>
        </Container>
    );
}
