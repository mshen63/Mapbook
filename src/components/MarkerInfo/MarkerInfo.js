import React, { useEffect, useState } from "react";
import MarkerCard from "./MarkerCard";
import MarkersMenu from "./MarkersMenu";

const MarkerInfo = (props) => {

    const { initMarker, markers, map, canMakeEdits } = props
    const [currMarker, setCurrMarker] = useState(initMarker.marker)
    const [showMenu, setShowMenu] = useState(true)

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
                    canMakeEdits = {canMakeEdits}
                />)
                : (<MarkerCard
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    canMakeEdits = {canMakeEdits}
                />)
            }
        </div>

    )
}
export default MarkerInfo;