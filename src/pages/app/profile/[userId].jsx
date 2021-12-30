import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers, getSpecificUser, getUserMarkers } from "../../../actions/User";




const ProfilePage = (props) => {
    
    // const { currUser, specificUser, specificUserFriends, markers } = props
    console.log(props)
    return (
        <p>Hello</p>
    )
}

ProfilePage.getInitialProps = async ({ query, req }) => {
    const userId = query.userId
    const cookies = req ? req.headers.cookie : null;
    console.log(cookies)

    try {
        const currUser = await getCurrentUser(cookies)
        console.log("currUser")
        console.log(currUser)
        const markers = await getUserMarkers(cookies, userId)
        console.log("markers")
        console.log(markers)
        // const specificUserFriends = await getUserFriends(cookies, userId)
        
        // const specificUser = await getSpecificUser(cookies, userId)


        return {
            markers,
           
            currUser,
          
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default ProfilePage;