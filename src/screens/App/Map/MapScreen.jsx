import PropTypes from "prop-types";
import Router from "next/router";
import urls from "../../../../utils/urls";
import classes from "./MapScreen.module.css";
import React, { useState, useEffect, useContext } from 'react';
// import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ReactMapGL from 'react-mapbox-gl'

const MapScreen = ({ currUser }) => {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        // The latitude and longitude of the center of London
        latitude: 51.5074,
        longitude: -0.1278,
        zoom: 10
    });
    return <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
        {/* {locations.map((location) => (
            <div key={location.id}>
                <Marker
                    latitude={location.center[1]}
                    longitude={location.center[0]}
                    offsetLeft={-20}
                    offsetTop={-10}>
                    <span role="img" aria-label="push-pin">📌</span>
                </Marker>
            </div>
        ))} */}
    </ReactMapGL>
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
