import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const ExploreMapContent = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
        provider,
    });
    useEffect(() => {
        map.addControl(searchControl);
    }, [map])

    return (
        <>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker
                position={[40.8054, -74.0241]}
                draggable={true}
                animate={true}
            >
                <Popup>
                    Hey ! you found me
                </Popup>
            </Marker>
        </>
    )
}

// MapPage.propTypes = {
//     currUser: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         username: PropTypes.string.isRequired,
//     }).isRequired,
// };

export default ExploreMapContent;
