import React, { useEffect, useState } from "react";
import Head from "next/head"
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser, getUserFriendRequests, getUserMarkers } from "../../actions/User";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
console.log("Mapbox: " + process.env.NEXT_PUBLIC_MAPBOX_KEY)
console.log("The url is in inddex.jsx: " + process.env.NEXT_PUBLIC_CLOUDINARY_PRESET)


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import MapScreen from "../../screens/App/Map/MapScreen";

const MapPage = (props) => {
    const { currUser, markers } = props
    return (
        <MapScreen currUser={currUser} markers={markers} />
    )
};


MapPage.getInitialProps = async ({ req }) => {
    const cookies = req ? req.headers.cookie : null;

    try {
        const markers = await getUserMarkers(cookies)
        const currUser = await getCurrentUser(cookies).catch(() => null)

        return {
            currUser,
            markers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default MapPage;