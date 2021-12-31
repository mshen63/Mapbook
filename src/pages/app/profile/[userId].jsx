import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers, getSpecificUser, getUserMarkers } from "../../../actions/User";
import { Divider, GridItem, Button, Grid, Flex, Text, Stack, Image, Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { format, toDate, parseISO } from "date-fns"
import MapScreen from "../../../screens/App/Map";
// import { useRouter } from "next/router";
import Router from "next/router";
import urls from "../../../../utils/urls";
import PersonalProfileScreen from "../../../screens/App/PersonalProfile"
import ProfileScreen from "../../../screens/App/Profile"




const ProfilePage = (props) => {
    const { friendReqs, currUser, specificUser, specificUserFriends, markers, allUsers } = props

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
            currUser,
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