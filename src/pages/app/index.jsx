import "leaflet/dist/leaflet.css";
import React from "react";
import { getCurrentUser, getUserMarkers } from "../../actions/User";
import MapScreen from "../../screens/App/Map/MapScreen";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

const MapPage = (props) => {

    const { markers } = props
    return (
        <MapScreen markers={markers} canMakeEdits={true} />
    )
};


MapPage.getInitialProps = async ({ req }) => {
    const cookies = req ? req.headers.cookie : null;

    try {

        const currUser = await getCurrentUser(cookies).catch(() => null)
        const markers = await getUserMarkers(cookies, currUser.id)

        return {
            markers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default MapPage;