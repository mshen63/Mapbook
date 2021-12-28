import mongoDB from "../index"
import Comment from "../models/Marker"
import User from "../models/User"
import Marker from "../models/Marker"
import { addComment } from "./Marker"

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