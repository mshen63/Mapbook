import urls from "../../utils/urls";
import { authedPostRequest, authedGetRequest } from "../../utils/requests";

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

