import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React, { createContext } from "react";
import { getMarker, getRandomMarkers } from "../../actions/Marker";
import { getUserLikedMarkers } from "../../actions/User";
import MapScreen from "../../screens/App/Map/MapScreen";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

export const LikedMarkerContext = createContext()

const ExplorePage = (props) => {
    const { markers, likedMarkers } = props
    return (
        <LikedMarkerContext.Provider value={likedMarkers}>
            <MapScreen markers={markers} canMakeEdits={false} />
        </LikedMarkerContext.Provider>
    )
}

ExplorePage.getInitialProps = async ({ req }) => {
    const cookies = req ? req.headers.cookie : null;
    try {
        const likedIds = await getUserLikedMarkers(cookies)
        const markers = await getRandomMarkers(cookies)

        // let markers = await Promise.all(
        //     friends.map(friend=>getUserMarkers(cookies, friend._id))
        // )
        // markers = [].concat.apply([], markers)
        let likedMarkers = await Promise.all(
            likedIds.map(likedid => getMarker(cookies, likedid))
        )
        return {
            markers,
            likedMarkers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default ExplorePage;