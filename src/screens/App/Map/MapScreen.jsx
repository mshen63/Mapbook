import PropTypes from "prop-types";
import Router from "next/router";
import urls from "../../../../utils/urls";
import classes from "./MapScreen.module.css";
import React, { useState, useEffect, useContext } from 'react';
import { add, random } from "lodash";
import { addMapFunctions } from "./addMapFunctions";
import { initializeMap } from "./initializeMap";
// import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import ReactMapGL from 'react-mapbox-gl'
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY


const MapScreen = ({ currUser, markers }) => {

    const [marks, setMarks] = useState(markers)
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [Map, setMap] = useState();
    const [text, setText] = useState("hello there")
    const [isMarker, setIsMarker] = useState(false)


    useEffect(() => {
        setPageIsMounted(true);

    }, [])

    // useEffect(() => {
    //     if (pageIsMounted) {
    //         console.log(isMarker)

    //         addMapFunctions(mapboxgl, Map, currUser, isMarker, setIsMarker)
    //     }


    // }, [isMarker])
    useEffect(() => {
        console.log("here")

        if (pageIsMounted) {
            let map = new mapboxgl.Map({
                container: "my-map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-77.02, 38.887],
                zoom: 5,

            });

            initializeMap(mapboxgl, map, currUser, marks, setMarks, setText, setIsMarker)
            // addMapFunctions(mapboxgl, map, currUser, isMarker, setIsMarker)
            setMap(map)
            map.on("click", async function (e) {

                // console.log("HLELLEOEEO")
        
                console.log("map func top")
                console.log(isMarker)
                if (!isMarker) {
                    console.log("isn't marker")
                    var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
                    let marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
                    marker = await createMarker(currUser, e.lngLat.lat, e.lngLat.lng, "Name here", "description here", true)
        
                    // marker.getElement().addEventListener('click', async (e) => {
                    //     console.log("Clicked! id here")
                    //     console.log(marker._id)
                    //     let getMark = await getMarker(currUser, marker._id)
                    //     console.log(getMark)
                    // })
                }
                console.log("map func bot")
        
                setIsMarker(false)
        
            })

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
            <p>{text}</p>
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
