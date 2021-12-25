import PropTypes from "prop-types";
import Router from "next/router";
import urls from "../../../../utils/urls";
import classes from "./MapScreen.module.css";
import React, { useState, useEffect, useContext } from 'react';
import { add, random } from "lodash";
import { initializeMap } from "./initializeMap";
import { createMarker } from "../../../actions/Marker";
// import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import ReactMapGL from 'react-mapbox-gl'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY


const MapScreen = ({ currUser, markers }) => {

    const [marks, setMarks] = useState(markers)
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [theMap, setTheMap] = useState(null);
    const [text, setText] = useState("hello there")
    const [addMode, setAddMode] = useState(false)

    useEffect(() => {
        setPageIsMounted(true);
    }, [])

    useEffect(() => {

        if (pageIsMounted) {
            let map = new mapboxgl.Map({
                container: "my-map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-77.02, 38.887],
                zoom: 5,

            });
            setTheMap(map)
            initializeMap(mapboxgl, map, currUser, marks, setMarks, setText)
        }

    }, [pageIsMounted]);

    return (
        <div >
            <p>{text}</p>
            
            <main >
                <div id="my-map" style={{ height: 500 }} />
            </main>
        </div>
    );

}


// MapScreen.propTypes = {
//     currUser: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         username: PropTypes.string.isRequired,
//     }).isRequired,
// };

export default MapScreen;
