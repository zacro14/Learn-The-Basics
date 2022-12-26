import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from '@chakra-ui/react';

type AddLessonProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddLessonCategory({ isOpen, onClose }: AddLessonProps) {
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Lesson Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form>
                        <Container>
                            <FormControl>
                                <FormLabel> Title</FormLabel>
                                <Input placeholder=" eg. math" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Decription</FormLabel>
                                <Textarea
                                    size={'lg'}
                                    placeholder=" category description"
                                />
                            </FormControl>
                        </Container>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="green" mr={3}>
                        Add
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
