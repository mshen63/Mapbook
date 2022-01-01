import React, { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import AddMarkerForm from "../AddMarkerForm";
import MarkerInfo from "../MarkerInfo/MarkerInfo";

const Sidebar = (props) => {
  const { currMarker, map, setCurrMarker, markers, setMapMarkers, canMakeNewMarkers } = props
  const [marks, setMarks] = useState(markers)

  useEffect(() => {
    setMarks(markers)
  }, [markers])
  return (
    <>

      <Toaster
        toastOptions={{
          style: {
            textAlign: "center"
          }
        }}
      />

      {currMarker.isNew
        ? (<AddMarkerForm
          map={map}
          currMarker={currMarker}
          setCurrMarker={setCurrMarker}
          setMarks={setMarks}
          marks={marks}
          setMapMarkers = {setMapMarkers}
        />)
        : (<MarkerInfo
          initMarker={currMarker}
          markers={marks}
          map={map}
          canMakeNewMarkers = {canMakeNewMarkers}
        />)
      }
    </>

  )
}

export default Sidebar;
