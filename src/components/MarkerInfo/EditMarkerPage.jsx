import { Badge, Box, Button, chakra, Flex, FormLabel, Input, Switch, Textarea } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import urls from "../../../utils/urls";
import { likeMarker, unlikeMarker, updateMarker } from "../../actions/Marker";
import { UserContext } from "../../pages/_app";
import DropzoneComponent from "../DropzoneComponent";


const CheckIcon = chakra(AiOutlineCheck)
const BackIcon = chakra(IoArrowBackCircleSharp)
const LikeIcon = chakra(HiThumbUp)
const LikeOutlineIcon = chakra(HiOutlineThumbUp)
const CloseIcon = chakra(AiOutlineClose)

const EditMarkerPage = (props) => {
    const router = useRouter();
    const { currMarker, setShowMenu, setEditing } = props
    const currUser = useContext(UserContext)
    const [likes, setLikes] = useState(currMarker.likes.length)
    const [isLiked, setIsLiked] = useState(currMarker.likes.includes(currUser.id))
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [comment, setComment] = useState("")

    const [name, setName] = useState(currMarker.name)
    const [desc, setDesc] = useState(currMarker.description)
    const [imgUrl, setImgUrl] = useState(currMarker.imgUrl)
    const [priv, setPriv] = useState(currMarker.priv)
    const [file, setFile] = useState(null)

    const handleGoToProfile = (userId) => Router.replace(urls.pages.app.profile.get(userId))
    const addEdits = async (e) => {
        if (!name) {
            toast.error("Please enter a marker name!")
        } else {
            let updates = { "name": name, "description": desc, "imgUrl": imgUrl, "priv": priv }
            await updateMarker(currUser, { "markerId": currMarker._id, "updates": updates })
            refreshData()
            clearEdits()
        }
    }

    const clearEdits = (e) => {
        setEditing(false)
        setName(currMarker.name)
        setDesc(currMarker.description)
        setImgUrl(currMarker.imgUrl)
        setFile(null)
    }

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
        router.replace(router.asPath)
        setIsRefreshing(true)
    }

    return (
        <Box width="18vw" height="80vh" borderWidth='1px' borderRadius='lg' overflowY="scroll" position="relative">
            <div bg="white">
                <BackIcon
                    bg="white"
                    borderRadius="full"
                    size={40}
                    position="absolute"
                    left="0px"
                    top="0px"
                    onClick={e => {
                        setEditing(false)
                        setShowMenu(true)
                    }}
                />
                <DropzoneComponent
                    setImgUrl={setImgUrl}
                    setFile={setFile}
                    file={file}
                />
            </div>

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
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        <Button size="xs" bg="white" marginLeft={0} marginRight={0} onClick={addEdits}>
                            <CheckIcon
                                size={18}
                                marginBottom="3px"
                            />
                        </Button>

                        <Button size="xs" bg="white" marginLeft={0} marginRight={0} onClick={clearEdits}>
                            <CloseIcon
                                size={18}
                                marginBottom="3px"
                            />
                        </Button>

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
                <Flex direction="column" align="center" justify="center">
                    <Input value={name} marginTop={3} marginBottom={3} onChange={e => setName(e.target.value)} />
                    <Textarea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                    <Flex marginTop={3}>
                        <FormLabel htmlFor="private" >
                            Private
                        </FormLabel>
                        <Switch id="private" isChecked={priv} onChange={(e) => setPriv(!priv)}></Switch>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}

export default EditMarkerPage


