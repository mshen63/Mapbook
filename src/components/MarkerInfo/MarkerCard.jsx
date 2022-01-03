import React, { useEffect, useState } from "react";
import EditMarkerPage from "./EditMarkerPage";
import NonEditMarkerPage from "./NonEditMarkerPage";

const MarkerCard = (props) => {
    const { currMarker, setShowMenu, canMakeEdits } = props
    const [editing, setEditing] = useState(false)
    useEffect(()=> {
        setEditing(false)
    }, [currMarker])
    return (
        <>
            {editing
                ? (<EditMarkerPage
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    setEditing = {setEditing}
                />)
                : (<NonEditMarkerPage
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    canMakeEdits={canMakeEdits}
                    setEditing = {setEditing}
                />)
            }
        </>
    )
}

export default MarkerCard


