import React, { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast'
import AddMarkerForm from "./AddMarkerForm";
import MarkerInfo from "./MarkerInfo"

const Sidebar = ({ currUser, currMarker, map, setCurrMarker, markers }) => {
  const [marks, setMarks] = useState(markers.map(mark=>({...mark, creator:currUser.username})))

  useEffect(()=> {
    setMarks(markers.map(mark=>({...mark, creator:currUser.username})))
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
        />)
        : (<MarkerInfo
          initMarker = {currMarker}
          markers={marks}
          map={map}
          currUser = {currUser}
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
