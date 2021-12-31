import { Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import MarkersMenu from "../MarkersMenu";
import MarkerCard from "../MarkerCard";

const MarkerInfo = (props) => {

    const { initMarker, markers, map, currUser, canMakeNewMarkers } = props
    const [currMarker, setCurrMarker] = useState(initMarker.marker)
    const [showMenu, setShowMenu] = useState(false)


    useEffect(()=> {
        setShowMenu(false)
        setCurrMarker(initMarker.marker)
    }, [initMarker])

    useEffect(() => {
        
        if (currMarker) {
            const match = markers.find(elem => elem._id === currMarker._id)
            if (match) {
                setCurrMarker(match)
            }
        } 

    }, [markers])



    return (
        <div>
            {showMenu || currMarker == null
                ? (<MarkersMenu
                    markers={markers}
                    map={map}
                    setCurrMarker={setCurrMarker}
                    setShowMenu={setShowMenu}
                />)
                : (<MarkerCard
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    currUser={currUser}
                    canMakeNewMarkers = {canMakeNewMarkers}
                />)
            }
        </div>

    )
}
export default MarkerInfo;