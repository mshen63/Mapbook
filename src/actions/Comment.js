import { authedPostRequest } from "../../utils/requests";
import urls from "../../utils/urls";

export const createComment = (cookies, markerId, content) =>
    authedPostRequest(
        urls.baseUrl + urls.api.comment.createComment,
        { markerId, content },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("createComment src/action/marker");
            } else if (!data.success) {

                throw new Error(data.message);
            }
            return data.payload;
        });


export const deleteComment = (cookies, markerId, commentId) =>
    authedPostRequest(
        urls.baseUrl + urls.api.comment.deleteComment,
        { markerId, commentId },
        cookies
    )
        .then((response) => response.json())
        .then((data) => {
            if (data == null) {
                throw new Error("deleteComment src/action/marker");
            } else if (!data.success) {

                throw new Error(data.message);
            }
            return data.payload;
        });

