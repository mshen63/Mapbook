import { Badge, Box, Button, chakra, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import Router, { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowRight, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import urls from "../../../utils/urls";
import { createComment } from "../../actions/Comment";
import { likeMarker, unlikeMarker } from "../../actions/Marker";
import DeleteControl from "../DeleteMarkerControl";
import { UserContext } from "../../pages/_app";
import NonEditMarkerPage from "./NonEditMarkerPage";
import EditMarkerPage from "./EditMarkerPage";

const BackIcon = chakra(IoArrowBackCircleSharp)
const LikeIcon = chakra(HiThumbUp)
const LikeOutlineIcon = chakra(HiOutlineThumbUp)
const SendIcon = chakra(AiOutlineArrowRight)
const EditIcon = chakra(AiOutlineEdit)

const MarkerCard = (props) => {
    const { currMarker, setShowMenu, canMakeEdits } = props
    const [editing, setEditing] = useState(false)
    useEffect(()=> {
        setEditing(false)
    }, [currMarker])
    return (
        <>
            {editing
                ? (<EditMarkerPage
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    setEditing = {setEditing}
                />)
                : (<NonEditMarkerPage
                    currMarker={currMarker}
                    setShowMenu={setShowMenu}
                    canMakeEdits={canMakeEdits}
                    setEditing = {setEditing}
                />)
            }
        </>
    )
}

export default MarkerCard


