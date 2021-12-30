
import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import FriendsScreen from "../../screens/App/Friends";
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers } from "../../actions/User";




const FriendsPage = ({ currUser, initialFriends, friendReqs, allUsers }) =>
(
    <FriendsScreen
        currUser={currUser}
        initialFriends={initialFriends}
        friendReqs={friendReqs}
        allUsers={allUsers}

    />
);

FriendsPage.getInitialProps = async ({ req }) => {

    const cookies = req ? req.headers.cookie : null;

    try {
        
        const friendReqs = await getUserFriendRequests(cookies)
        const currUser = await getCurrentUser(cookies)
        const initialFriends = await getUserFriends(cookies, currUser.id)
        const allUsers = await getAllUsers(cookies)


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

export default FriendsPage;