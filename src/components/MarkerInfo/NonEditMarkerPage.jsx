import { Badge, Box, Button, chakra, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import Router, { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowRight, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import urls from "../../../utils/urls";
import { createComment } from "../../actions/Comment";
import { likeMarker, unlikeMarker } from "../../actions/Marker";
import DeleteControl from "../DeleteControl";
import { UserContext } from "../../pages/_app";


const BackIcon = chakra(IoArrowBackCircleSharp)
const LikeIcon = chakra(HiThumbUp)
const LikeOutlineIcon = chakra(HiOutlineThumbUp)
const SendIcon = chakra(AiOutlineArrowRight)
const EditIcon = chakra(AiOutlineEdit)
const NonEditMarkerPage = (props) => {
    const router = useRouter();
    const { currMarker, setShowMenu, canMakeNewMarkers, setEditing } = props
    const currUser = useContext(UserContext)
    const [likes, setLikes] = useState(currMarker.likes.length)
    const [isLiked, setIsLiked] = useState(currMarker.likes.includes(currUser.id))
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [comment, setComment] = useState("")

    const randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
    const handleGoToProfile = (userId) => Router.replace(urls.pages.app.profile.get(userId))

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

    return (
        <Box width="18vw" height="80vh" borderWidth='1px' borderRadius='lg' overflowY="scroll" position="relative">
            <div
                onClick={e => setShowMenu(true)}
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
                    <Badge
                        borderRadius='full'
                        px='2'
                        variant="outline"
                        onClick={e => handleGoToProfile(currMarker.user._id)}
                        _hover={{ textDecoration: "underline" }}
                    >
                        Creator: {currMarker.user.username}
                    </Badge>
                    {currMarker.priv && (<Badge
                        borderRadius='full'
                        px='2'
                        variant="solid"
                    >
                        Private
                    </Badge>)}

                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        {canMakeNewMarkers
                            && (<DeleteControl setShowMenu={setShowMenu} currMarker={currMarker} />)
                        }
                        {canMakeNewMarkers
                            && (<Button size="xs" bg="white" marginLeft={0} marginRight={0} onClick={e => setEditing(true)}>
                                <EditIcon
                                    size={18}
                                    marginBottom="3px"
                                />
                            </Button>)
                        }
                        {isLiked
                            ? (
                                <Button size="xs" onClick={(e) => handleLikeButton(false)} bg="white" >
                                    {likes}
                                    <LikeIcon
                                        size={18}
                                        marginBottom="5px"
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
                <Box fontSize={10}>{(new Date(currMarker.post_date)).toDateString()}</Box>

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
                        <Text fontSize="xs" _hover={{ textDecoration: "underline" }} onClick={e => handleGoToProfile(comment.user._id)}>{comment.user.username}</Text>
                        <Text fontSize="sm">{comment.content}</Text>


                    </Box>
                        <Text width="100%" marginBottom={2} fontSize="10px">{formatDistance(parseISO(comment.postDate), Date.now(), { addSuffix: true })}</Text>

                    </>))}


                </Flex>
            </Box>
        </Box>
    )
}

export default NonEditMarkerPage


