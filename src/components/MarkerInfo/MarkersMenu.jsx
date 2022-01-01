import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";

const MarkersMenu = (props) => {
    const { markers, map, setCurrMarker, setShowMenu } = props

    return (
        <Flex
            height="80vh"
            width="18vw"
            id="hellO"
            overflowY="scroll"
            align="center"
            direction="column"
        >
            <Text>Markers </Text>
            <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />
            {markers.map((mark) => {
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
            })}
        </Flex>

    )
}

export default MarkersMenu