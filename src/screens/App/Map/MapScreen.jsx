import PropTypes from "prop-types";
import Router from "next/router";
import urls from "../../../../utils/urls";
import classes from "./MapScreen.module.css";
import React, { useState, useEffect, useContext } from 'react';
import { add, random } from "lodash";
import { initializeMap } from "./initializeMap";
import { createMarker } from "../../../actions/Marker";
import Sidebar from "../../../components/Sidebar"
import {
    HStack
} from "@chakra-ui/react";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY


const MapScreen = ({ currUser, markers }) => {

    
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [theMap, setTheMap] = useState(null);
    const [currMarker, setCurrMarker] = useState({ isNew: false, marker: null })
    const [prevMarker, setPrevMarker] = useState(null)


    useEffect(() => {
        setPageIsMounted(true);
    }, [])

    useEffect(() => {

        if (prevMarker && prevMarker.isNew) {
            prevMarker.marker.remove()
        }
        setPrevMarker(currMarker)
    }, [currMarker])

    useEffect(() => {

        if (pageIsMounted) {
            let map = new mapboxgl.Map({
                container: "my-map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-77.02, 38.887],
                zoom: 5,

            });
            setTheMap(map)
            initializeMap(mapboxgl, map, currUser, markers, setCurrMarker)
        }

    }, [pageIsMounted]);

    return (
        <div >
            <HStack spacing={8}>

                {theMap  && <Sidebar
                    currUser={currUser}
                    currMarker={currMarker}
                    map={theMap}
                    setCurrMarker={setCurrMarker}
                    markers = {markers}
                />}

                <main >
                    <div id="my-map" style={{ height: "85vh", width: "80vw" }} />
                </main>
            </HStack>
        </div >
    );

}

export default MapScreen;
