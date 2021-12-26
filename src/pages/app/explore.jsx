import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import "leaflet/dist/images/marker-shadow.png";
import { getCurrentUser } from "../../actions/User";

const ExplorePage = ({ currUser, router }) => {
    const MapWithNoSSR = dynamic(() => import("../../screens/App/Explore"), {
        ssr: false
    });
    // useEffect(() => {
    //     router.replace(router.asPath)
    // }, [])
    return (
        <>
        <h1 style = {{textAlign: "center", fontSize: "30px"}}>Welcome back to explore{currUser.username}</h1>
            <div id="map" style={{ height: "500px", margin: "0px", padding: "0px" }}>
                <MapWithNoSSR currUser = {currUser}/>
            </div>
        </>

    );
}

ExplorePage.getInitialProps = async ({ req, res, router }) => {
    const cookies = req ? req.headers.cookie : null;
    const currUser = await getCurrentUser(cookies).catch(() => null)

    return {currUser, router}
}

export default ExplorePage;