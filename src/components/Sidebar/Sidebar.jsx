import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast'
import AddMarkerForm from "./AddMarkerForm";
import MarkerInfo from "./MarkerInfo"

const Sidebar = (props) => {
  const { currUser, currMarker, map, setCurrMarker, markers, setMapMarkers, canMakeNewMarkers } = props
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
          currUser={currUser}
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
          currUser={currUser}
          canMakeNewMarkers = {canMakeNewMarkers}
        />)
      }
    </>

  )
}

// Sidebar.propTypes = {
//   loggedIn: PropTypes.bool.isRequired,
//   currentRoute: PropTypes.string.isRequired,
// };

export default Sidebar;
