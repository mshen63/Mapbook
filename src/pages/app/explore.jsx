import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React from "react";
import { getCurrentUser, getUserFriends, getUserMarkers } from "../../actions/User";
import MapScreen from "../../screens/App/Map/MapScreen";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

const ExplorePage = (props) => {
    const { markers } = props
    return (
        <MapScreen markers={markers} canMakeEdits={false} />
    )
}

ExplorePage.getInitialProps = async ({ req }) => {
    const cookies = req ? req.headers.cookie : null;
    try {
        const currUser = await getCurrentUser(cookies).catch(() => null)
        const friends = await getUserFriends(cookies, currUser.id)
        let markers = await Promise.all(
            friends.map(friend=>getUserMarkers(cookies, friend._id))
        )
        markers = [].concat.apply([], markers)
        return {
            markers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default ExplorePage;