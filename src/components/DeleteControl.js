import {
    ModalCloseButton, ModalBody, Lorem, ModalFooter,
    Text, Flex, InputRightElement, InputGroup, Divider, Input, chakra, Box, Badge, Image, Stack,
    Button, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
} from "@chakra-ui/react";
import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/router";
import { deleteMarker } from "../actions/Marker";

const DeleteIcon = chakra(HiOutlineTrash)
const DeleteControl = ({setShowMenu, currUser, currMarker}) => {
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteMarker = async () => {
        await deleteMarker(currUser, currMarker._id)
        router.replace(router.asPath)
        setShowMenu(true)
    }

    return (
        <>
            <Button size="xs" bg="white" marginLeft={0} marginRight={0} onClick={onOpen} >
                <DeleteIcon
                    size={18}
                    marginBottom="3px"
                />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Marker</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this marker?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleDeleteMarker}>
                            Confirm
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteControl;