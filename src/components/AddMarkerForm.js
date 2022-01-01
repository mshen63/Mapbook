import {
    Box, Button, Center, Divider, Flex, FormControl, FormLabel, Icon, Input, InputGroup, Stack, Switch, Text, Textarea
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import toast from 'react-hot-toast';
import { AiFillFileAdd } from 'react-icons/ai';
import { createMarker } from "../actions/Marker";
import {UserContext} from "../pages/_app"

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET

const AddMarkerForm = ({ map, currMarker, setCurrMarker, setMarks, marks, setMapMarkers }) => {
    const currUser = useContext(UserContext)
    const [priv, setPriv] = useState(true)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const router = useRouter();
    // the preview
    const [file, setFile] = useState(null)
    const refreshData = () => {
        router.replace(router.asPath)
    }

    // useEffect(() => {
    //     console.log(imgUrl)
    // }, [imgUrl])

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
            setImgUrl(JSON.parse(data).secure_url)
        }).then((e) => {
            setFile(Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        }).catch(e => toast.error("Photo invalid or too large!"))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1, multiple: false })

    useEffect(() => {
        setName("")
        setDesc("")
        setPriv(true)
        setFile(null)
        setImgUrl("")
    }, [currMarker])

    const addMarkerToMap = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Please name your marker!")
        } else if (desc === "") {
            return toast.error("Please add a description!")
        } else {
            await createMarker(currUser, currMarker.marker.getLngLat().lat, currMarker.marker.getLngLat().lng, name, desc, priv, imgUrl)
                .then(datamarker => {
                    var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
                    let marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([currMarker.marker.getLngLat().lng, currMarker.marker.getLngLat().lat]).addTo(map)
                    marker.getElement().addEventListener('click', async (e) => {
                        setCurrMarker({ isNew: false, marker: datamarker })
                        map.flyTo({ center: [currMarker.marker.getLngLat().lng, currMarker.marker.getLngLat().lat], zoom: 8 })
                        e.stopPropagation();
                    })
                    setMapMarkers(mapMarkers => [...mapMarkers, marker])
                    setMarks(marks => [...marks, datamarker])
                    toast.success("Marker created!")
                })
                .catch(e => toast.error(e.message))
            refreshData();

        }
    }

    return (
        <>
            <Flex
                flexDir="column"
                alignItems="center"
                backgroundColor="whiteAlpha.900"
                width="18vw"
                height="80vh"
            >
                <Text>Add Marker </Text>
                <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
                <Box minW={{ base: "50%", md: "300px" }} overflowY="scroll" display="flex" justifyContent="center">
                    <form onSubmit={addMarkerToMap} >
                        <Stack
                            spacing={6}
                            p="1rem"
                        >
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        placeholder="Name"
                                        variant="outline"
                                        focusBorderColor="#4c8181"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <Flex align="center" justify="center" width="100%" height="50%">
                                {file
                                    ? (<img src={file.preview} />)
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
                                        width="100%"
                                        padding={20}
                                        _hover={{ bg: "green.50", borderColor: "gray.400" }}
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} padding={20} />
                                        <Icon as={AiFillFileAdd} mr={2} />
                                        <Text fontSize="12px" color="gray.500">Add Image Here</Text>
                                    </Center>
                                    )
                                }
                            </Flex>

                            <FormControl>
                                <InputGroup>
                                    <Textarea
                                        placeholder="Description"
                                        variant="outline"
                                        focusBorderColor="#4c8181"
                                        id="description"
                                        resize="vertical"
                                        value={desc}
                                        height="200px"
                                        onChange={(event) => setDesc(event.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl display='flex' alignItems='center' justifyContent="center">

                                <FormLabel htmlFor="private"  >
                                    Private
                                </FormLabel>
                                <Switch id="private" isChecked={priv} onChange={(e) => setPriv(!priv)}></Switch>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                bg="green.100"
                                width="full"
                                marginTop="0px"
                            >
                                Add Marker
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Flex>
        </>
    )
}
export default AddMarkerForm;