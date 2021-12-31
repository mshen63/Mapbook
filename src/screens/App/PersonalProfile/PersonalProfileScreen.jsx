import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { Textarea, Icon, Center, Input, ButtonIcon, ButtonGroup, chakra, Editable, EditablePreview, EditableInput, IconButton, useEditableControls, Divider, GridItem, Button, Grid, Flex, Text, Stack, Image, Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { format, toDate, parseISO } from "date-fns"
import MapScreen from "../Map/MapScreen";
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import Router from "next/router";
import { updateUser } from "../../../actions/User";

import toast from  "react-hot-toast";
import FriendsScreen from "../Friends";
import urls from "../../../../utils/urls";
// import { AiFillFileAdd } from 'react-icons/ai';
import { FiEdit } from "react-icons/fi"
import { AiFillFileAdd, AiOutlineCheck, AiOutlineClose } from "react-icons/ai"

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

    const addEdits = async(e) => {
        
        setIsEditing(false)
        // console.log({username:username, bio:bio, profileImg:file})
        await updateUser(currUser, {username:username, bio:bio, profileImg:file})
        console.log("added edits!")
        refreshData()
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
                            onClick={e => setIsEditing(false)}
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
                    />
                    <Box>
                        <Text>Username: {username}</Text>
                        <Text>Bio: {bio}</Text>
                        <Text>Joined: {formatDistance(parseISO(specificUser[0].registerDate), Date.now(), { addSuffix: true })}</Text>
                    </Box>
                </Flex>)
            }


            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />

            <FriendsScreen
                currUser={currUser}
                initialFriends={specificUserFriends}
                friendReqs={friendReqs}
                allUsers={allUsers}

            />

        </Flex>
    )
}


export default PersonalProfileScreen