import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import ProfileScreen from "../../screens/App/Profile";
import { getCurrentUser } from "../../actions/User";




const ProfilePage = ({ currUser }) => 
    (
        <ProfileScreen currUser = {currUser}/>
    );

ProfilePage.getInitialProps = async ({ pageProps, req, res }) => {
    const cookies = req ? req.headers.cookie : null;
    const currUser = await getCurrentUser(cookies).catch(() => null)

    return {currUser}
}

export default ProfilePage;