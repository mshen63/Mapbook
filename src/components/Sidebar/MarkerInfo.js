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
    Textarea,
    Collapse,
    VStack, 
    Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { createMarker } from "../../actions/Marker";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import toast, { Toaster } from 'react-hot-toast'

// current marker is the data marker
const MarkerInfo = ({ currMarker, markers }) => {
    const [shows, setShows] = useState(Array(markers.length).fill(false))
    let array = [1, 2, 3, 4, 5]

    useEffect(() => {
        setShows(Array(markers.length).fill(false))
    }, [])
    useEffect(() => {
        let newshow = shows
        newshow[markers.indexOf(currMarker)] = true
        setShows(newshow)


    }, [currMarker])


    useEffect(() => {
        let addition = []
        let iterations = shows.length - markers.length
        for (let i = 0; i < iterations; i++) {
            addition.push(false)
        }
        // console.log(shows)
        setShows(shows.concat(addition))
        // console.log(shows)
    }, [markers])


    const openTab = (i) => {
        console.log("before")
        console.log(shows)
        let show = shows
        show[i] = !show[i]
        setShows(show)
        console.log("after")
        console.log(shows)
    }

    // {shows[index]}
    // {mark.description}
    return (
        <div>
            <Accordion maxHeight="80vh" maxWidth="15vw" id="hellO" overflowY="scroll" allowMultiple="true" allowToggle="true">
                {markers.map((mark, index) => {
                    return (
                        <AccordionItem>
                            <h2>
                                <AccordionButton onClick = {()=>console.log("hello")}>
                                    <Box flex='1' textAlign='left'>
                                        {mark.name}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                {mark.description}
                            </AccordionPanel>
                        </AccordionItem>

                    )
                })}
            </Accordion>
        </div>
        //  <AccordionItem id={array[index]}>
        //  <Button onClick={() => openTab(index)}>{mark.name}</Button>
        //  <Collapse startingHeight = {20} isOpen={shows[index]}>
        //      {mark.description}
        //  </Collapse>
        // </AccordionItem>
    )
}
export default MarkerInfo;