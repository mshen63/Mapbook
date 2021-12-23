import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";
import { authedPostRequest, authedGetRequest } from "../../utils/requests";

export const createMarker = (cookies, lat, lng, name, description, private) =>
    authedPostRequest(
        urls.baseUrl + urls.api.user.createMarker,
        { lat, lng, name, description, private },
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
        urls.baseUrl + urls.api.user.deleteMarker,
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



export const getMarker = (cookies, markerId) =>
    authedPostRequest(
        urls.baseUrl + urls.api.user.getMarker,
        { markerId },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("getMarker src/action/marker");
            } else if (!data.success) {
                throw new Error(data.message);
            }
            return data.payload;
        });