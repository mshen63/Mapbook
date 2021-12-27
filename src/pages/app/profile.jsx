import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import ProfileScreen from "../../screens/App/Profile";
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers } from "../../actions/User";




const ProfilePage = ({ currUser, friends, friendReqs, allUsers }) =>
(
    <ProfileScreen
        currUser={currUser}
        friends={friends}
        friendReqs={friendReqs}
        allUsers={allUsers}

    />
);

ProfilePage.getInitialProps = async ({ req }) => {

    const cookies = req ? req.headers.cookie : null;

    try {
        const friends = await getUserFriends(cookies)
        const friendReqs = await getUserFriendRequests(cookies)
        const currUser = await getCurrentUser(cookies).catch(() => null)
        const allUsers = await getAllUsers(cookies).catch(() => null)
        console.log(allUsers)
        console.log("allUsers")


        return {
            currUser,
            friends,
            friendReqs,
            allUsers
        }
    } catch (e) {
        return { error: e.message }
    }
}

export default ProfilePage;