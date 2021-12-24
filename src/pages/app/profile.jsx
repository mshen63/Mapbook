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
    console.log("profile")
    const currUser = await getCurrentUser(cookies).catch(() => null)
    console.log(currUser)

    return {currUser}
}

export default ProfilePage;