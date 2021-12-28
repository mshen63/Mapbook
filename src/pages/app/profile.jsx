import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import ProfileScreen from "../../screens/App/Profile";
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers } from "../../actions/User";




const ProfilePage = ({ currUser, initialFriends, friendReqs, allUsers }) =>
(
    <ProfileScreen
        currUser={currUser}
        initialFriends={initialFriends}
        friendReqs={friendReqs}
        allUsers={allUsers}

    />
);

ProfilePage.getInitialProps = async ({ req }) => {

    const cookies = req ? req.headers.cookie : null;

    try {
        const initialFriends = await getUserFriends(cookies)
        const friendReqs = await getUserFriendRequests(cookies)
        const currUser = await getCurrentUser(cookies)
        const allUsers = await getAllUsers(cookies)
        console.log(allUsers)
        console.log("allUsers")


        return {
            currUser,
            initialFriends,
            friendReqs,
            allUsers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default ProfilePage;