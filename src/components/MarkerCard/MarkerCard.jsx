import {
    Text, Flex, InputRightElement, InputGroup, Divider, Input, chakra, Box, Badge, Image, Stack,
    Button, Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon,
} from "@chakra-ui/react";
import { IoArrowBackCircleSharp } from "react-icons/io5"
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi"
import React, { useState, useEffect } from "react";
import { likeMarker, unlikeMarker } from "../../actions/Marker";
import { createComment } from "../../actions/Comment"
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai"
import toast from "react-hot-toast";
import formatDistance from "date-fns/formatDistance";
import { format, toDate, parseISO } from "date-fns"

const BackIcon = chakra(IoArrowBackCircleSharp)
const LikeIcon = chakra(HiThumbUp)
const LikeOutlineIcon = chakra(HiOutlineThumbUp)
const SendIcon = chakra(AiOutlineArrowRight)
const MarkerCard = (props) => {
    const router = useRouter();
    const { currUser, currMarker, setShowMenu } = props
    const [likes, setLikes] = useState(currMarker.likes.length)
    const [isLiked, setIsLiked] = useState(currMarker.likes.includes(currUser.id))
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [comment, setComment] = useState("")

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

    const handleComment = async () => {
        if (!comment) {
            toast.error("Please enter a comment!")
        } else {
            await createComment(currUser, currMarker._id, comment)
            setComment("")
        }
        refreshData()
    }

    const refreshData = () => {

        router.replace(router.asPath)
        setIsRefreshing(true)
    }

    useEffect(() => {
        setIsRefreshing(false);
    }, [props])


    const goBack = (e) => {
        setShowMenu(true)
    }
    return (
        <Box width="18vw" height="80vh" borderWidth='1px' borderRadius='lg' overflowY="scroll" position="relative">

            <div
                onClick={goBack}
                bg="white"
            >
            <BackIcon
                size={40}
                position="absolute"
                left="0px"
                top="0px"
                
                
            />
            </div>
            <Image src={currMarker.imgUrl} />

            <Box p='6'>
                <Box display='flex' alignItems='baseline' justifyContent="space-between">
                    <Badge borderRadius='full' px='2' colorScheme='green'>
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
                            ? (
                                <Button size="xs" onClick={(e) => handleLikeButton(false)} bg="white" >
                                    {likes}
                                    <LikeIcon
                                        size={18}
                                        marginBottom="3px"
                                        marginLeft="2px"


                                    />
                                </Button>
                            )
                            : (
                                <Button size="xs" onClick={(e) => handleLikeButton(true)} bg="white">
                                    {likes}
                                    <LikeOutlineIcon
                                        size={18}
                                        marginBottom="3px"
                                        marginLeft="2px"

                                    />
                                </Button>
                            )
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

                <Box color="gray.600">
                    {currMarker.description}
                </Box>
                <Divider borderColor="gray.600" marginTop={3} marginBottom={3} />

                <Box>Comments: </Box>
                <Flex display='flex' mt='2' align='center' justify="center" direction="column">
                    <InputGroup marginBottom={3}>

                        <Input

                            placeholder="Add Comment"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                        <InputRightElement
                        >
                            <Box onClick={handleComment} _hover={{ color: "gray.600", stroke: "gray.600" }} color="gray.300"><SendIcon ></SendIcon></Box>
                        </InputRightElement>
                    </InputGroup>

                    {currMarker.comments && currMarker.comments.slice(0).reverse().map(comment => (<><Box rounded="md" width="100%" padding={3} bg="green.100" >
                        <Text fontSize="xs">{comment.user.username}</Text>
                        <Text fontSize="sm">{comment.content}</Text>


                    </Box>
                        <Text width="100%" marginBottom={2} fontSize="10px">{formatDistance(parseISO(comment.postDate), Date.now(), { addSuffix: true })}</Text>

                    </>))}


                </Flex>
            </Box>
        </Box>
    )
}

export default MarkerCard


