import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LikedMarkerContext } from "../../pages/app/explore";

const MarkersMenu = (props) => {
    const router = useRouter();
    const { markers, map, setCurrMarker, setShowMenu, canMakeEdits } = props
    let likedMarkers
    let title = "Your Markers"

    if (router.asPath.includes("/explore")) {
        likedMarkers = useContext(LikedMarkerContext)
        console.log(likedMarkers)
        title = "Suggested Markers"
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
            {markers && markers.map((mark) => {
                if(mark) {
                    console.log(mark)
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
            })}

            {router.asPath.includes("/explore") &&
                <>
                    <Text marginTop = {5}>Liked Markers</Text>
                    <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
                    {likedMarkers.length && likedMarkers.map(mark => (
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
                </>
            }
        </Flex>
    )
}

export default MarkersMenu