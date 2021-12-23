import PropTypes from "prop-types";
import Router from "next/router";
import urls from "../../../../utils/urls";
import classes from "./ExploreScreen.module.css";
import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import ExploreMapContent from "./ExploreMapContent";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


const ExploreScreen = ({ currUser }) => {
  

  return (
    <MapContainer center={[50, -120]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <ExploreMapContent />
    </MapContainer>
  )
}

// MapPage.propTypes = {
//     currUser: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         username: PropTypes.string.isRequired,
//     }).isRequired,
// };

export default ExploreScreen;
