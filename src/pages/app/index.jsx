import React, { useEffect, useState } from "react";
import Head from "next/head"
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser } from "../../actions/User";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import MapScreen from "../../screens/App/Map/MapScreen";

const MapPage = ({ currUser, pageProps }) => (
        <MapScreen />

    );


MapPage.getInitialProps = async ({ req, res, pageProps }) => {
    console.log(pageProps)
    const cookies = req ? req.headers.cookie : null;
    console.log("map")
    const currUser = await getCurrentUser(cookies).catch(() => null)
    console.log(currUser)

    return { currUser, pageProps }
}

export default MapPage;