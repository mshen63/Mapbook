import React from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"
import { Divider, GridItem, Button, Grid, Flex, Text, Stack, Image, Box, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";
import { format, toDate, parseISO } from "date-fns"
import MapScreen from "../Map/MapScreen";
// import { useRouter } from "next/router";
import Router from "next/router";
import urls from "../../../../utils/urls";

const ProfileScreen = (props) => {
    const { specificUser, specificUserFriends, markers } = props
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
                    <Text>Username: {specificUser[0].username}</Text>
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
                        <Button
                            bg="green.100"
                            m={3}
                            p={3}
                            rounded="md"
                            key={user._id}
                            minWidth="10%"
                            marginBottom={10}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            onClick={e => handleGoToProfile(user._id)}
                        >
                            <Flex align="center" direction="row" >
                                <Image margin={1} src={user.profileImg} boxSize="20px" borderRadius="full"></Image>
                                <Text >{user.username}</Text>
                            </Flex>

                        </Button>
                    )
                })}
            </Flex>
            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
            <MapScreen currUser={specificUser} markers={markers} canMakeEdits={false} />

        </Flex>
    )
}


export default ProfileScreen