import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LikedMarkerContext } from "../../pages/app/explore";

const MarkersMenu = (props) => {
    const router = useRouter();
    const { markers, map, setCurrMarker, setShowMenu, canMakeEdits } = props
    let likedMarkers
    let title = "Your Markers"
    let instr = "Tap anywhere on the map to add a Marker!"

    if (router.asPath.includes("/explore")) {
        likedMarkers = useContext(LikedMarkerContext)
        title = "Suggested Markers"
    } else if (router.asPath.includes("/profile")) {
        title = "User Markers"
        instr = "User has no public markers!"
    }

    return (
        <Flex
            height="80vh"
            width="18vw"
            id="hellO"
            overflowY="scroll"
            align="center"
            direction="column"
        >
            <Text>{title}</Text>
            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
            {markers && markers.length != 0 && markers.map((mark) => {
                if (mark) {
                    return (
                        <Stack margin="5px" key={mark._id} width="90%">
                            <Button onClick={(e) => {
                                map.flyTo({ center: [mark.lng, mark.lat], zoom: 8 })
                                setCurrMarker(mark)
                                setShowMenu(false)
                            }
                            }
                                bg="green.200"
                                _hover={{ bg: "green.300" }}
                                rounded={0}
                            >
                                <Box flex='1' textAlign='left'>
                                    {mark.name}
                                </Box>
                            </Button>
                        </Stack>
                    )
                } else {
                    return (<></>)
                }
            })
            }
            {markers && markers.length == 0 && <Text color="gray.600">{instr}</Text>}

            {router.asPath.includes("/explore") &&
                <>
                    <Text marginTop={5}>Liked Markers</Text>
                    <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
                    {likedMarkers && likedMarkers.length != 0 && likedMarkers.map(mark => (
                        <Stack margin="5px" key={mark._id} width="90%">
                            <Button onClick={(e) => {
                                map.flyTo({ center: [mark.lng, mark.lat], zoom: 8 })
                                setCurrMarker(mark)
                                setShowMenu(false)
                            }
                            }
                                bg="green.200"
                                _hover={{ bg: "green.300" }}
                                rounded={0}
                            >
                                <Box flex='1' textAlign='left'>
                                    {mark.name}
                                </Box>
                            </Button>
                        </Stack>
                    ))}
                    {likedMarkers && likedMarkers.length == 0 && <Text color="gray.600">Like a marker to add to this list!</Text>}

                </>
            }
        </Flex>
    )
}

export default MarkersMenu