import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import "leaflet/dist/images/marker-shadow.png";
import { getCurrentUser, getUserFriends, getUserMarkers } from "../../actions/User";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import MapScreen from "../../screens/App/Map/MapScreen";

const ExplorePage = (props) => {
    const { currUser, markers } = props
    console.log(props)
    return (
        // <div>Hello</div>
        <MapScreen currUser={currUser} markers={markers} canMakeNewMarkers={false} />
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
            currUser,
            markers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default ExplorePage;