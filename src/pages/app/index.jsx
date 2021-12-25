import React, { useEffect, useState } from "react";
import Head from "next/head"
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser, getUserFriendRequests, getUserMarkers } from "../../actions/User";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import MapScreen from "../../screens/App/Map/MapScreen";

const MapPage = ({ currUser, markers }) => (
    <MapScreen currUser = {currUser} markers={markers} />

);


MapPage.getInitialProps = async ({ req }) => {
    const cookies = req ? req.headers.cookie : null;

    try {
        const markers = await getUserMarkers(cookies)
       
        // const markers = [{lng: 30, lat:30},{lng: 33, lat:33} ]
        console.log("map")
        const currUser = await getCurrentUser(cookies).catch(() => null)
        console.log(currUser)

        return {
            currUser,
            markers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default MapPage;