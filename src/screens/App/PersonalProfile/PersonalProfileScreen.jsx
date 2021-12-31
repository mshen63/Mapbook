import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { Divider, GridItem, Button, Grid, Flex, Text, Stack, Image, Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { format, toDate, parseISO } from "date-fns"
import MapScreen from "../Map/MapScreen";
// import { useRouter } from "next/router";
import Router from "next/router";
import FriendsScreen from "../Friends";
import urls from "../../../../utils/urls";

const PersonalProfileScreen = (props) => {
    const { currUser, friendReqs, specificUser, specificUserFriends, allUsers } = props
    const handleGoToProfile = (userId) => Router.replace(urls.pages.app.profile.get(userId))

    return (
        <Flex align="center" justify="center" direction="column" overflowY="scroll" overflowX="scroll">
            <Flex align="center" justify="center"  >
                <Image
                    src={specificUser[0].profileImg}
                    boxSize="200px"
                    marginTop={3}
                />
                <Box>
                    <Text>Personal!</Text>
                    <Text>Username: {specificUser[0].username}</Text>
                    <Text>Bio: {specificUser[0].bio ?? "nothing to see here"}</Text>
                    <Text>Joined: {formatDistance(parseISO(specificUser[0].registerDate), Date.now(), { addSuffix: true })}</Text>
                </Box>
            </Flex>
            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />

            <FriendsScreen
                currUser={currUser}
                initialFriends={specificUserFriends}
                friendReqs={friendReqs}
                allUsers={allUsers}

            />

        </Flex>
    )
}


export default PersonalProfileScreen