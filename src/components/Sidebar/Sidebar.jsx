import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import NavLink from "../NavLink";
// import routes from "./routes";
import styles from "./Sidebar.module.css";
import { logout } from "../../actions/User";
import Router from "next/router";
import urls from "../../../utils/urls";
import toast, { Toaster } from 'react-hot-toast'
import AddMarkerForm from "./AddMarkerForm";
import MarkerInfo from "./MarkerInfo"
// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

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
          setMarks = {setMarks}
          marks = {marks}
          />)
      : (<MarkerInfo markers = {marks} />)
      }
    </>

  )
}

// Sidebar.propTypes = {
//   loggedIn: PropTypes.bool.isRequired,
//   currentRoute: PropTypes.string.isRequired,
// };

export default Sidebar;
