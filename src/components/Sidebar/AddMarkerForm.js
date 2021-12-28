import {
    Stack, Input, Checkbox, FormControl,
    Heading,
    Button,
    InputGroup,
    Box,
    Textarea
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { createMarker } from "../../actions/Marker";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import toast from 'react-hot-toast'



// current marker is a map marker
// we're just using it for the latitude longitude picked by user
const AddMarkerForm = ({ currUser, map, currMarker, setCurrMarker, setMarks, marks, setMapMarkers }) => {
    const [priv, setPriv] = useState(true)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        setName("")
        setDesc("")
        setPriv(true)
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
                                <Checkbox isChecked={priv} onChange={(e) => setPriv(!priv)}>
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