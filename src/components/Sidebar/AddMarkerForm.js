import {
    Stack, Input, Checkbox, FormControl, Text, Divider, Flex,
    Heading,
    Button,
    InputGroup,
    Box,
    Textarea,
    FormLabel,
    Switch,
    Center,
    useColorModeValue, Icon
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { createMarker } from "../../actions/Marker";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import toast from 'react-hot-toast'
import { useDropzone } from "react-dropzone"
import { AiFillFileAdd } from 'react-icons/ai';




// current marker is a map marker
// we're just using it for the latitude longitude picked by user
const AddMarkerForm = ({ currUser, map, currMarker, setCurrMarker, setMarks, marks, setMapMarkers }) => {
    const [priv, setPriv] = useState(true)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [markerPic, setMarkerPic] = useState(null)
    const [file, setFile] = useState(null)
    const onDrop = useCallback((acceptedFiles) => {

        setFile(Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0])
        }))

        acceptedFiles.forEach(file => {
            console.log(file)
            const reader = new FileReader()
            reader.onload = (load) => {
                console.log(reader.result)
                setMarkerPic(load.currentTarget.result)
            }
            reader.readAsArrayBuffer(file)
        })
    }, [])
    useEffect(() => {
        if (file) {
            console.log(file.preview)
        }

    }, [file])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: "image/*", onDrop, maxFiles: 1, multiple: false })

    const dropText = isDragActive ? "Drop files here..." : "Drag and drop files here, or click to select files"
    const activeBg = useColorModeValue("gray.100", "gray.600")
    const borderColor = useColorModeValue(
        isDragActive ? 'teal.300' : 'gray.300',
        isDragActive ? 'teal.500' : 'gray.500'
    )
    const inputProps = getInputProps()
    const rootProps = getRootProps()
    // console.log(inputProps)
    // console.log(rootProps.onDragOver)

    useEffect(() => {
        setName("")
        setDesc("")
        setPriv(true)
        setFile(null)
    }, [currMarker])

    const addMarkerToMap = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Please name your marker!")
        } else if (desc === "") {
            return toast.error("Please add a description!")
        } else {
            await createMarker(currUser, currMarker.marker.getLngLat().lat, currMarker.marker.getLngLat().lng, name, desc, priv)
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
        }
    }

    return (
        <>
            <Flex
                flexDir="column"
                alignItems="center"
                backgroundColor="whiteAlpha.900"
                width="20vw"
                height="80vh"
            >

                <Text>Add Marker </Text>
                <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
                <Box minW={{ base: "50%", md: "300px" }} overflowY="scroll">

                    <form onSubmit={addMarkerToMap}>
                        <Stack
                            spacing={4}
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
                            <Flex align = "center" justify="center" width = "100%" height = "50%">
                            {file ? (<img
                                src={file.preview}

                            />)
                                : (<Center
                                    p={10}
                                    cursor="pointer"
                                    bg={isDragActive ? activeBg : 'transparent'}
                                    transition="background-color 0.2s ease"
                                    borderRadius={4}
                                    border="3px dashed"
                                    borderColor={borderColor}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    width="100%"
                                    padding={20}
                                    _hover = {{bg:"green.50"}}

                                    {...getRootProps()}

                                >

                                    <input {...getInputProps()} padding={20} />
                                    <Icon as={AiFillFileAdd} mr={2} />
                                    <Text fontSize = "12px" color="gray.500">Add Image Here</Text>

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
                            <FormControl display='flex' alignItems='center' m={0}>

                                <FormLabel htmlFor="private" >
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