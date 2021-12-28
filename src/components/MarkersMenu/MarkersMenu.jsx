import { Box, Stack, Button, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";

const MarkersMenu = (props) => {
    const { markers, map, setCurrMarker, setShowMenu } = props

    return (
        <Box

            height="80vh"
            width="15vw"
            id="hellO"
            overflowY="scroll"

        >

            {markers.map((mark) => {
                return (
                    <Stack margin={3}>
                        <Button onClick={(e) => {
                            map.flyTo({ center: [mark.lng, mark.lat], zoom: 8 })
                            setCurrMarker(mark)
                            setShowMenu(false)
                        }
                        }>
                            <Box flex='1' textAlign='left'>
                                {mark.name}
                            </Box>

                        </Button>
                    </Stack>
                )
            })}
        </Box>

    )
}

export default MarkersMenu