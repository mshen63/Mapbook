import {
    HStack, Stack, Input, Checkbox, FormControl, Flex,
    Heading,
    Button,
    InputGroup,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormHelperText,
    InputRightElement,
    FormErrorMessage,
    Textarea
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { createMarker } from "../../actions/Marker";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import toast, { Toaster } from 'react-hot-toast'
const AddMarkerForm = ({ currUser, map, setCurrMarker }) => {
    const [priv, setPriv] = useState(true)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    const addMarkerToMap = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Please name your marker!")
        } else if (desc === "") {
            return toast.error("Please add a description!")
        } else {
            marker.getElement().addEventListener('click', async (e) => {
                setCurrMarker({isNew: false, marker: marker})
                e.stopPropagation();
    
            })
            marker = await createMarker(currUser, e.lngLat.lat, e.lngLat.lng, "Name here", "description here", true)
    
            toast.success("Marker created!")
        }

    }


    return (
        <>

            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                backgroundColor="whiteAlpha.900"
                p="1rem"
            >
                <Heading color="teal.400">Add Marker</Heading>
                <Box minW={{ base: "80%", md: "400px" }}>

                    <form onSubmit={addMarkerToMap}>
                        <Stack
                            spacing={4}
                            p="1rem"

                            boxShadow="md"
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
                            <FormControl>
                                <InputGroup>

                                    <Textarea
                                        placeholder="Description"
                                        variant="outline"
                                        focusBorderColor="#4c8181"
                                        id="description"
                                        resize="vertical"
                                        value={desc}
                                        height="50px"
                                        onChange={(event) => setDesc(event.target.value)}
                                    />


                                </InputGroup>

                            </FormControl>
                            <FormControl>
                                <Checkbox defaultIsChecked>
                                    Private?
                                </Checkbox>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                            >
                                Add Marker
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>


        </>
    )
}
export default AddMarkerForm;