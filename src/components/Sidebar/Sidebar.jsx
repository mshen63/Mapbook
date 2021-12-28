import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast'
import AddMarkerForm from "./AddMarkerForm";
import MarkerInfo from "./MarkerInfo"

const Sidebar = ({ currUser, currMarker, map, setCurrMarker, markers }) => {
  const [marks, setMarks] = useState(markers)

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
        />)
        : (<MarkerInfo
          initMarker = {currMarker}
          markers={marks}
          map={map}
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
