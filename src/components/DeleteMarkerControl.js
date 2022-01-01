import {
    Button, chakra, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteMarker } from "../actions/Marker";
import { useContext } from "react";
import { UserContext } from "../pages/_app";
import { MarkersContext} from "../screens/App/Map/MapScreen"

const DeleteIcon = chakra(HiOutlineTrash)
const DeleteControl = ({setShowMenu, currMarker}) => {
    const currUser = useContext(UserContext)
    const router = useRouter();
    const {mapMarkers, setMapMarkers} = useContext(MarkersContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteMarker = async () => {
        mapMarkers[currMarker._id].remove()
        delete mapMarkers[currMarker._id]
        setMapMarkers(mapMarkers)
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