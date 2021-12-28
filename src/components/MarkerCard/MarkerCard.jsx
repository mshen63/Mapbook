import { chakra, Box, Badge, Image, Stack, Button, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import {IoArrowBackCircleSharp} from "react-icons/io5"
const BackIcon = chakra(IoArrowBackCircleSharp)
const MarkerCard = (props) => {
    const { currMarker, setShowMenu } = props


    const goBack =(e) => {
        setShowMenu(true)
    }
    return (
        <Box width = "20vw" height = "80vh" borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Button onClick={goBack}><BackIcon size = {20}/></Button>
          <Image src={currMarker.imgUrl}  />
    
          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                New
              </Badge>
              <Box
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='2'
              >
                {3} beds &bull; {2} baths
              </Box>
            </Box>
    
            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {currMarker.name}
            </Box>
    
            <Box>
              {currMarker.description}
              <Box as='span' color='gray.600' fontSize='sm'>
                / wk
              </Box>
            </Box>
    
            <Box display='flex' mt='2' alignItems='center'>
              
              <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                likes here reviews
              </Box>
            </Box>
          </Box>
        </Box>
      )
}

export default MarkerCard


