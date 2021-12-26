import {
    HStack, Stack, Input, Checkbox, FormControl, Flex,
    Heading,
    Button,
    InputGroup,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormHelperText,
    InputRightElement,
    FormErrorMessage,
    Textarea
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { createMarker } from "../../actions/Marker";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js")
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY
import toast, { Toaster } from 'react-hot-toast'

// current marker is the data marker
const CurrentMarker = ({ currMarker }) => {
    console.log("marker")
    console.log(currMarker)
    
    return (
        <>
            <p>{currMarker.marker.lat}</p>
            <p>{currMarker.marker.lng}</p>
            <p>{currMarker.marker.name}</p>
            <p>{currMarker.marker.description}</p>
            <p>{currMarker.marker.user}</p>
        </>
    )
}
export default CurrentMarker;