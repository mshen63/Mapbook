import { Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const MarkerInfo = ({ currMarker, markers, map }) => {
    const [shows, setShows] = useState([])

    useEffect(() => {
        setShows([markers.indexOf(currMarker.marker)])
    }, [currMarker])


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
                                        setShows(shows.filter(elem => elem != index))
                                    } else {
                                        setShows([...shows, index])
                                    }
                                }

                                }>
                                    <Box flex='1' textAlign='left'>
                                        {mark.name}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <p>{mark.description}</p>
                                <button>Cool</button>
                            </AccordionPanel>
                        </AccordionItem>

                    )
                })}
            </Accordion>
        </div>

    )
}
export default MarkerInfo;