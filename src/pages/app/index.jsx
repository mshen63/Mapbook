import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser } from "../../actions/User";

const MapPage = ({ currUser, pageProps }) => {
    const MapWithNoSSR = dynamic(() => import("../../screens/App/Map"), {
        ssr: false
    });
    useEffect(() => {
        // router.replace(router.asPath)
        console.log(pageProps)
    }, [])

    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>Welcome back {currUser.username}</h1>
            <div id="map" style={{ height: "500px", margin: "0px", padding: "0px" }}>
                <MapWithNoSSR />
            </div>
        </>

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