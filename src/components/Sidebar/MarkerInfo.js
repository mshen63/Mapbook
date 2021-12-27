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
import { map } from "lodash";

// current marker is the data marker
const MarkerInfo = ({ currMarker, markers, map }) => {
    console.log("markers in markerinfo")
    console.log(markers)
    const [shows, setShows] = useState([])

    useEffect(() => {
        setShows(Array(markers.length).fill(false))
        console.log("here!")
        console.log(shows)
    }, [])

    useEffect(() => {

        let newshow = shows
        let openindex = markers.indexOf(currMarker.marker)
        if (openindex != -1) {
            let alreadyInArray = newshow.indexOf(openindex)
            if (alreadyInArray == -1) {
                newshow.push(openindex)
            } else {
                newshow.splice(alreadyInArray, 1)
            }
            setShows(newshow)

        }


    }, [currMarker])


    useEffect(() => {
        console.log("never use this lol")
        let addition = []
        let iterations = shows.length - markers.length
        for (let i = 0; i < iterations; i++) {
            addition.push(false)
        }
        // console.log(shows)
        setShows(shows.concat(addition))
        // window.location.reload(false)
        // console.log(shows)
    }, [markers])


    return (
        <div>
            <Accordion
                index={shows}
                height="80vh"
                width="15vw"
                id="hellO"
                overflowY="scroll"
                allowMultiple="true"
                allowToggle="true"
            >


                {markers.map((mark, index) => {
                    return (
                        <AccordionItem key={index}>
                            <h2 >
                                <AccordionButton onClick={(e) => {
                                    map.flyTo({ center: [mark.lng, mark.lat], zoom: 8 })
                                    if (shows.includes(index)) {
                                        setShows(shows.filter(elem=>elem!=index))
                                    } else {
                                        setShows([...shows, index])}
                                    }
                                    
                                    }>
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