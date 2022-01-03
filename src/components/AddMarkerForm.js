import {
    Box, Button, Divider, Flex, FormControl, FormLabel, Input, InputGroup, Stack, Switch, Text, Textarea
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { createMarker, getMarker } from "../actions/Marker";
import { UserContext } from "../pages/_app";
import { MarkersContext } from "../screens/App/Map/MapScreen";
import DropzoneComponent from "./DropzoneComponent";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

const AddMarkerForm = ({ map, currMarker, setCurrMarker, setMarks, marks }) => {
    const currUser = useContext(UserContext)
    const { mapMarkers, setMapMarkers } = useContext(MarkersContext)
    const [priv, setPriv] = useState(true)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [file, setFile] = useState(null)

    const router = useRouter();
    // the preview

    const refreshData = () => {
        router.replace(router.asPath)
    }


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
                    let marker = new mapboxgl.Marker({color: "#68D391"}).setLngLat([currMarker.marker.getLngLat().lng, currMarker.marker.getLngLat().lat]).addTo(map)
                    marker.getElement().addEventListener('click', async (e) => {
                        e.stopPropagation();
                        let updatedMarker = await getMarker(currUser, datamarker._id)
                        setCurrMarker({ isNew: false, marker: updatedMarker })
                        map.flyTo({ center: [currMarker.marker.getLngLat().lng, currMarker.marker.getLngLat().lat], zoom: 8 })

                    })

                    mapMarkers[datamarker._id] = marker
                    setMapMarkers(mapMarkers)
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
                            <DropzoneComponent 
                            setImgUrl={setImgUrl}
                            setFile = {setFile}
                            file = {file}
                            />

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