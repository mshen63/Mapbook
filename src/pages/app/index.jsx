import React, { useEffect, useState } from "react";
import Head from "next/head"
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser } from "../../actions/User";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

const MapPage = ({ currUser, pageProps }) => {
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [Map, setMap] = useState();

    useEffect(() => {
        setPageIsMounted(true);
    }, [])
    useEffect(() => {

        if (pageIsMounted) {
            const map = new mapboxgl.Map({
                container: "my-map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-77.02, 38.887],
                zoom: 12.5,
                pitch: 45,
                maxBounds: [
                    [-77.875588, 38.50705], // Southwest coordinates
                    [-76.15381, 39.548764], // Northeast coordinates
                ],
            });

            
            map.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true
                })
            )
            const container = map.getContainer();
            let relocateB = container.getElementsByClassName('mapboxgl-ctrl-geolocate')
            Array.prototype.slice.call(relocateB).forEach((button)=>button.click())

        }

    }, [pageIsMounted]);

    // useEffect(() => {
    //     if (pageIsMounted && data) {
    //         Map.on("load", function () {
    //             addDataLayer(Map, data);
    //         });
    //     }
    // }, [pageIsMounted, setMap, data, Map]);

    return (
        <div >

            <button id="Hello" onClick={() => console.log("clicked!")}></button>
            <main >
                <div id="my-map" style={{ height: 500 }} />
            </main>


        </div>
    );

}

MapPage.getInitialProps = async ({ req, res, pageProps }) => {
    console.log(pageProps)
    const cookies = req ? req.headers.cookie : null;
    console.log("map")
    const currUser = await getCurrentUser(cookies).catch(() => null)
    console.log(currUser)

    return { currUser, pageProps }
}

export default MapPage;