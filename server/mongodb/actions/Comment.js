import mongoDB from "../index"
import Comment from "../models/Comment"
import { addComment, removeComment } from "./Marker"

export async function createComment(currUser, { markerId, content }) {
    if (currUser == null) {
        throw new Error("You must be logged in to add a comment!");
    }
    if (markerId == null || content == null) {

        throw new Error("Please provide all fields!")
    }

    return Comment.create({
        user: currUser.id,
        marker: markerId,
        content: content
    }).then(async (comment) => {
        await addComment(currUser, {
            markerId: markerId,
            commentId: comment._id,
        });
        return comment;
    })
}


export const deleteComment = async (currUser, { commentId }) => {
    if (currUser == null) {
        throw new Error("error with currUser in deleteMarker (mongodb/actions/comment)");
    } else if (commentId == null) {
        throw new Error("error with commentId in deleteMarker (mongodb/actions/comment)");
    }
    await mongoDB();

    return Comment.findOneAndDelete({ _id: commentId}).then(async (deleted) => {
        if (deleted == null) {
            throw new Error(
                "No marker found to delete!"
            );
        }
        await removeComment(currUser, {
            markerId: deleted._id,
            commentId: commentId
        })
        return deleted;
    });
};