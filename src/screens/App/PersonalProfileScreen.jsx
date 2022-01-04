import { Box, Center, chakra, Divider, Flex, Icon, IconButton, Image, Text, Textarea } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { AiFillFileAdd, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { updateUser } from "../../actions/User";
import FriendsSection from "../../components/FriendsSection";


const EditIcon = chakra(FiEdit)
const CheckIcon = chakra(AiOutlineCheck)
const CloseIcon = chakra(AiOutlineClose)
const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
const PersonalProfileScreen = (props) => {

    const { currUser, friendReqs, specificUser, specificUserFriends, allUsers } = props
    const [isEditing, setIsEditing] = useState(false)
    const [username, setUsername] = useState(specificUser[0].username)
    const [bio, setBio] = useState(specificUser[0].bio)
    const [file, setFile] = useState(null)
    const router = useRouter();

    useEffect(()=> {
        setFile(null)
        setBio(specificUser[0].bio)
        setIsEditing(false)
    }, [specificUser])

    const addEdits = async(e) => {
        
        const updates = {}
        updates.bio = bio
        if (file) {
            updates.profileImg = file
        }
        
        await updateUser(currUser, updates)
        refreshData()
        
    }

    const cancelEdits = async(e) => {
        setIsEditing(false)
        setFile(null)
        setBio(specificUser[0].bio)
    }
    const refreshData = () => {
        router.replace(router.asPath)
    }

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        const formData = new FormData();
        formData.append("file", file)
        formData.append("upload_preset", preset)
        fetch(url, {
            method: "POST",
            body: formData
        }).then(resp => {

            return resp.text()
        }).then((data) => {
            setFile(JSON.parse(data).secure_url)
        }).catch(e => toast.error("Photo invalid or too large!"))
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1, multiple: false })


    return (
        <Flex
            align="center"
            justify="center"
            direction="column"
            overflowY="scroll"
            overflowX="scroll"
        >
            {isEditing
                ? (<Flex align="center" justify="center"  >
                    <Flex direction="column" m={0} p={0}>
                        <IconButton

                            children={<CheckIcon />}
                            onClick={addEdits}
                            bg="white"
                            p={0}
                            m={0}

                        ></IconButton>
                        <IconButton

                            children={<CloseIcon />}
                            onClick={cancelEdits}
                            bg="white"
                            p={0}
                            marginBottom="90px"

                        ></IconButton>
                    </Flex>

                    <Flex align="center" justify="center" width="100%" height="50%">
                        {file
                            ? (<img src={file} width="200px" height="200px" />)
                            : (<Center
                                p={10}
                                cursor="pointer"
                                bg={isDragActive ? "gray.100" : 'transparent'}
                                transition="background-color 0.2s ease"
                                borderRadius={4}
                                border="3px dashed"
                                borderColor="gray.300"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="column"
                                width="200px"
                                height="200px"
                                padding={20}
                                _hover={{ bg: "green.50", borderColor: "gray.400" }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} padding={20} />
                                <Icon as={AiFillFileAdd} />
                                <Text width="90px" fontSize="12px" color="gray.500">Add Image Here</Text>
                            </Center>
                            )
                        }
                    </Flex>
                    <Box>
                        <Text>Username: {username}</Text>
                        <Textarea
                            value={bio ?? ""}
                            onChange={e => setBio(e.target.value)}

                        />
                        <Text>Joined: {formatDistance(parseISO(specificUser[0].registerDate), Date.now(), { addSuffix: true })}</Text>
                    </Box>
                </Flex>)
                : (<Flex align="center" justify="center"  >
                    <IconButton
                        marginBottom="125px"
                        children={<EditIcon />}
                        onClick={e => setIsEditing(true)}
                        bg="white"
                    ></IconButton>

                    <Image
                        src={specificUser[0].profileImg}
                        boxSize="200px"
                        marginTop={3}
                        marginRight ={5}
                    />
                    <Box>
                        <Text>Username: {username}</Text>
                        <Text>Bio: {bio}</Text>
                        <Text>Joined: {formatDistance(parseISO(specificUser[0].registerDate), Date.now(), { addSuffix: true })}</Text>
                    </Box>
                </Flex>)
            }


            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />

            <FriendsSection
                currUser={currUser}
                initialFriends={specificUserFriends}
                friendReqs={friendReqs}
                allUsers={allUsers}
            />

        </Flex>
    )
}


export default PersonalProfileScreen