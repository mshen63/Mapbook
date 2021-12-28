import { Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import MarkersMenu from "../MarkersMenu";
import MarkerCard from "../MarkerCard";

const MarkerInfo = (props) => {

    const { initMarker, markers, map, currUser } = props
    const [currMarker, setCurrMarker] = useState(initMarker.marker)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(()=> {
        setShowMenu(false)
        setCurrMarker(initMarker.marker)
    }, [initMarker])

    return (
        <div>
            {showMenu || currMarker==null
                ? (<MarkersMenu
                    markers={markers}
                    map={map}
                    setCurrMarker={setCurrMarker}
                    setShowMenu={setShowMenu}
                />)
                : (<MarkerCard
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    currUser = {currUser}
                />)
            }
        </div>

    )
}
export default MarkerInfo;