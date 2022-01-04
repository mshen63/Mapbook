import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { useRouter } from "next/router";
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers, getSpecificUser, getUserMarkers } from "../../../actions/User";
import PersonalProfileScreen from "../../../screens/App/PersonalProfileScreen"
import ProfileScreen from "../../../screens/App/ProfileScreen"

const ProfilePage = (props) => {
    const { friendReqs, currUser, specificUser, specificUserFriends, markers, allUsers } = props
    const router = useRouter();

    // useEffect(()=> {
    //     router.reload(window.location.pathname)
    // }, [specificUser])
    return (<>
        {
            currUser.id === specificUser[0]._id
                ? (<PersonalProfileScreen
                    currUser={currUser}
                    specificUser = {specificUser}
                    specificUserFriends={specificUserFriends}
                    markers={markers}
                    friendReqs = {friendReqs}
                    allUsers = {allUsers}

                />)
                : (<ProfileScreen
                    specificUser={specificUser}
                    specificUserFriends={specificUserFriends}
                    markers={markers}
                />)
        }
    </>
    )

}

ProfilePage.getInitialProps = async ({ query, req }) => {
    const userId = query.userId
    const cookies = req ? req.headers.cookie : null;

    try {
        console.log("redid props for userid: " + userId)
        let friendReqs;
        let allUsers;
        const currUser = await getCurrentUser(cookies)
        const markers = await getUserMarkers(cookies, userId)
        const specificUserFriends = await getUserFriends(cookies, userId)
        const specificUser = await getSpecificUser(cookies, userId)
        if (currUser.id === specificUser[0]._id) {
            friendReqs = await getUserFriendRequests(cookies)
            allUsers = await getAllUsers(cookies)

        }
        
        const returnbody = {
            markers,
            specificUser,
            specificUserFriends, 
            friendReqs, 
            allUsers
        }
        return returnbody
    } catch (e) {
        return { error: e.message }
    }
}

export default ProfilePage;