import PropTypes from "prop-types";
import Router from "next/router";
import urls from "../../../../utils/urls";
import classes from "./MapScreen.module.css";
import React, { useState, useEffect, useContext } from 'react';
// import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import ReactMapGL from 'react-mapbox-gl'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY


const MapScreen = ({ currUser }) => {
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
                zoom: 5,
                maxBounds: [
                    [-77.875588, 38.50705], // Southwest coordinates
                    [-76.15381, 39.548764], // Northeast coordinates
                ],
            });

            map.addControl(
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken, 
                    mapboxgl: mapboxgl
                })
            )
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
            <main >
                <div id="my-map" style={{ height: 500 }} />
            </main>
        </div>
    );

}


// const MapScreen = ({ currUser }) => {
//     return (
//         <MapContainer center={[40.8054, -74.0241]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//             />
//             <Marker
//                 position={[40.8054, -74.0241]}
//                 draggable={true}
//                 animate={true}
//             >
//                 <Popup>
//                     Hey ! you found me
//                 </Popup>
//             </Marker>
//         </MapContainer>
//     )
// }

// MapPage.propTypes = {
//     currUser: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         username: PropTypes.string.isRequired,
//     }).isRequired,
// };

export default MapScreen;
