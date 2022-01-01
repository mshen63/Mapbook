import urls from "../../utils/urls";
import { authedPostRequest, authedGetRequest } from "../../utils/requests";

export const createMarker = (cookies, lat, lng, name, description, priv, imgUrl) =>
    authedPostRequest(
        urls.baseUrl + urls.api.marker.createMarker,
        { lat, lng, name, description, priv, imgUrl },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("createMarker src/action/marker");
            } else if (!data.success) {

                throw new Error(data.message);
            }
            return data.payload;
        });


export const deleteMarker = (cookies, markerId) =>
    authedPostRequest(
        urls.baseUrl + urls.api.marker.deleteMarker,
        { markerId },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("deleteMarker src/action/marker");
            } else if (!data.success) {
                throw new Error(data.message);
            }
            return data.payload;
        });

export const updateMarker = (cookies, params) =>
    authedPostRequest(
        urls.baseUrl + urls.api.marker.updateMarker,
        params,
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("updateMarker src/action/marker");
            } else if (!data.success) {
                throw new Error(data.message);
            }
            return data.payload;
        });



export const getMarker = (cookies, markerId) =>
    authedPostRequest(
        urls.baseUrl + urls.api.marker.getMarker,
        { markerId },
        cookies
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {

            if (data == null) {
                throw new Error("getMarker src/action/marker");
            } else if (!data.success) {
                throw new Error(data.message);
            }
            return data.payload;
        })


export const likeMarker = (cookies, markerId) =>
    authedPostRequest(
        urls.baseUrl + urls.api.marker.likeMarker,
        { markerId },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("likeMarker src/action/user");
            } else if (!data.success) {
                throw new Error(data.message);
            }
            return data.payload;
        });

export const unlikeMarker = (cookies, markerId) =>
    authedPostRequest(
        urls.baseUrl + urls.api.marker.unlikeMarker,
        { markerId },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("unlikeMarker src/action/user");
            } else if (!data.success) {
                throw new Error(data.message);
            }
            return data.payload;
        });
