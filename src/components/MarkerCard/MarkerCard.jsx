import { chakra, Box, Badge, Image, Stack, Button, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon } from "@chakra-ui/react";
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi"
import React, { useState, useEffect } from "react";
import { likeMarker, unlikeMarker } from "../../actions/Marker";
import { useRouter } from "next/router";

const BackIcon = chakra(IoArrowBackCircleSharp)
const LikeIcon = chakra(HiThumbUp)
const LikeOutlineIcon = chakra(HiOutlineThumbUp)
const MarkerCard = (props) => {
    const router = useRouter();
    const { currUser, currMarker, setShowMenu } = props
    const [likes, setLikes] = useState(currMarker.likes.length)
    const [isLiked, setIsLiked] = useState(currMarker.likes.includes(currUser.id))
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleLikeButton = async (isLike) => {

        setIsLiked(isLike)
        if (isLike) {
            setLikes(likes + 1)
            await likeMarker(currUser, currMarker._id)
        } else {
            setLikes(likes - 1)
            await unlikeMarker(currUser, currMarker._id)

        }
        refreshData();
    }

    const refreshData = () => {

        router.replace("/app")
        setIsRefreshing(true)
        console.log("refresh!")
    }

    useEffect(() => {
        setIsRefreshing(false);
    }, [props])


    const goBack = (e) => {
        setShowMenu(true)
    }
    return (
        <Box width="20vw" height="80vh" borderWidth='1px' borderRadius='lg' overflow='hidden'>

            <div
                onClick={goBack}
                bg="white"
            >
                <BackIcon
                    size={40}
                    position="absolute"
                    left="33px"
                    top="90px"
                />
            </div>
            <Image src={currMarker.imgUrl} />

            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                        Creator: {currMarker.user.username}
                    </Badge>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        {isLiked
                            ? (<Button onClick={(e) => handleLikeButton(false)} bg="white" >{likes}<LikeIcon size={20} /></Button>)
                            : (<Button onClick={(e) => handleLikeButton(true)} bg="white">{likes}<LikeOutlineIcon size={20} /></Button>)
                        }

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


