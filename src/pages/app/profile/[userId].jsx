import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { getCurrentUser, getUserFriends, getUserFriendRequests, getAllUsers, getSpecificUser, getUserMarkers } from "../../../actions/User";
import { Divider, GridItem, Button, Grid, Flex, Text, Stack, Image, Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { format, toDate, parseISO } from "date-fns"
import MapScreen from "../../../screens/App/Map";



const ProfilePage = (props) => {

    const { currUser, specificUser, specificUserFriends, markers } = props
    return (
        <Flex align="center" justify="center" direction="column" overflowY="scroll" overflowX = "scroll">
            <Flex align="center" justify="center"  >
                <Image
                    src="https://i.pinimg.com/474x/59/95/18/5995186a3da28eef8906f5d3878c76c2.jpg"
                    boxSize="200px"
                    marginTop={3}
                    p={3}
                />
                <Box>
                    <Text p={5}>Username: {specificUser[0].username}</Text>
                    <Text>Bio: {specificUser[0].bio ?? "nothing to see here"}</Text>
                    <Text>Joined: {formatDistance(parseISO(specificUser[0].registerDate), Date.now(), { addSuffix: true })}</Text>
                </Box>
            </Flex>
            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />

            <p>Friends</p>
            <Flex
                w="80vw"
                overflowX="scroll"
            >
                {specificUserFriends && specificUserFriends.map(user => {
                    return (
                        <Box

                            p={3}
                            rounded="md"
                            key={user._id}
                            width="80%"
                            marginBottom={10}
                        >
                            <Image
                                src="https://i.pinimg.com/474x/59/95/18/5995186a3da28eef8906f5d3878c76c2.jpg"
                                boxSize="200px"
                                marginTop={3}
                                p={3}
                            />
                            <Text textAlign="center">{user.username}</Text>

                        </Box>
                    )
                })}
            </Flex>
            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
            <MapScreen currUser={specificUser} markers={markers} canMakeNewMarkers={false}/>

        </Flex>

    )
}

ProfilePage.getInitialProps = async ({ query, req }) => {
    const userId = query.userId
    const cookies = req ? req.headers.cookie : null;

    try {
        const currUser = await getCurrentUser(cookies)
        const markers = await getUserMarkers(cookies, userId)
        const specificUserFriends = await getUserFriends(cookies, userId)
        const specificUser = await getSpecificUser(cookies, userId)
        const returnbody = {
            markers,
            currUser,
            specificUser,
            specificUserFriends
        }

        return returnbody
    } catch (e) {
        return { error: e.message }
    }
}

export default ProfilePage;