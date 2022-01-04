import { HStack } from "@chakra-ui/react";
import React, { useEffect, useState, createContext, useContext } from 'react';
import Sidebar from "../../../components/Sidebar";
import { UserContext } from "../../../pages/_app";
import { initializeMap } from "./initializeMap";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

export const MarkersContext = createContext()
const MapScreen = ({ markers, canMakeEdits }) => {
    const currUser = useContext(UserContext)
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [theMap, setTheMap] = useState(null);
    const [currMarker, setCurrMarker] = useState({ isNew: false, marker: null })
    const [prevMarker, setPrevMarker] = useState(null)
    const [mapMarkers, setMapMarkers] = useState([])

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

            initializeMap(currUser, mapboxgl, map, markers, setCurrMarker, mapMarkers, setMapMarkers, canMakeEdits)
        }
    }, [pageIsMounted]);

    return (
        <MarkersContext.Provider value={{mapMarkers, setMapMarkers}}>
        <div>
            <HStack spacing={8}>

                {theMap && <Sidebar
                    currMarker={currMarker}
                    map={theMap}
                    setCurrMarker={setCurrMarker}
                    markers={markers}
                    setMapMarkers = {setMapMarkers}
                    canMakeEdits = {canMakeEdits}
                />}

                <main >
                    <div id="my-map" style={{ height: "85vh", width: "75vw" }} />
                </main>
            </HStack>
        </div >
        </MarkersContext.Provider>
    );

}

export default MapScreen;
