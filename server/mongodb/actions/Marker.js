import { v2 as cloudinary } from "cloudinary";
import mongoDB from "../index";
import Marker from "../models/Marker";
import User from "../models/User";
import Comment from "../models/Comment"
import { addMarker, removeMarker } from "./User";

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

export const getRandomMarkers = async (currUser) => {
  if (currUser == null) {
    throw new Error("error with currUser in getTenRandomMarkers (mongodb/actions/marker)");
  }
  await mongoDB();

  const emptyMarkers = await Marker.aggregate([
    { $match: { user: { $ne: currUser.id }, priv: false } },
    { $sample: { size: 5 } }
  ])
  const markers = await Promise.all(
    emptyMarkers.map(mark => getMarker(currUser, { markerId: mark._id })))
  return markers
}


export const getMarker = async (currUser, { markerId }) => {

  if (currUser == null) {
    throw new Error("error with currUser in getMarker (mongodb/actions/marker)");
  } else if (markerId == null) {
    throw new Error("error with markerId in getMarker (mongodb/actions/marker)");
  }

  await mongoDB();

  const marker = await Marker.findById(markerId)
    .populate({
      path: "user",
      model: "User",
      select: "_id username"
    })
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user",
        model: "User",
        select: "_id username"
      },
      select: "_id content postDate"
    })

    .exec()
  return marker
  // if (marker == null) {
  //   throw new Error("getMarker find error!")
  // } else {
  //   return marker
  // }
};

export async function createMarker(currUser, props) {
  const { lat, lng, name, description, priv, imgUrl } = props
  if (currUser == null) {
    throw new Error("You must be logged in to add a marker!");
  }
  if (lat == null || lng == null || name == null || description == null || priv == null) {

    throw new Error("Please provide all fields!")
  }

  let repMarker = await Marker.findOne({ user: currUser.id, name: name })
  if (repMarker != null) {
    throw new Error("Marker with that name already exists!")
  }
  return Marker.create({
    user: currUser.id,
    lat,
    lng,
    name,
    imgUrl,
    description,
    priv
  }).then(async (marker) => {
    await addMarker(currUser, {
      markerId: marker._id,
    });
    return marker;
  })
}

export const updateMarker = async (currUser, { markerId, updates }) => {
  if (currUser == null) {
    throw new Error("error with currUser in editMarker (mongodb/actions/marker)");
  }
  if (markerId == null || updates == null) {
    throw new Error("error with params in editMarker (mongodb/actions/marker)");
  }
  await mongoDB()
  const marker = await Marker.findOneAndUpdate({ _id: markerId }, updates)

}

export const deleteMarker = async (currUser, { markerId }) => {
  if (currUser == null) {
    throw new Error("error with currUser in deleteMarker (mongodb/actions/marker)");
  } else if (markerId == null) {
    throw new Error("error with markerId in deleteMarker (mongodb/actions/marker)");
  }
  await mongoDB();

  return Marker.findOneAndDelete({ _id: markerId, user: currUser.id }).then(async (deleted) => {
    if (deleted == null) {
      throw new Error(
        "No marker found to delete!"
      );
    }
    await removeMarker(currUser, {
      markerId: deleted._id
    })
    return deleted;
  });
};

export const likeMarker = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("likeMarker error!")
  }
  await mongoDB();
  await Marker.findByIdAndUpdate(markerId, {
    $push: { likes: currUser.id }
  })
  await User.findByIdAndUpdate(currUser.id, {
    $push: { likedMarkers: markerId }
  })
}

export const unlikeMarker = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("unlikeMarker error!")
  }
  await mongoDB();
  await Marker.findByIdAndUpdate(markerId, {
    $pull: { likes: currUser.id }
  })
  await User.findByIdAndUpdate(currUser.id, {
    $pull: { likedMarkers: markerId }
  })
}

// COMMENTS
export const getComments = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("getComments error!")
  }
  await mongoDB();

  const marker = await Marker.findById(markerId)
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user",
        model: "User",
        select: "_id username"
      },
      select: "_id content postDate"
    })
    .exec()

  if (marker == null) {
    throw new Error("getComments find error!")
  } else {
    return marker.comments
  }
}

export const addComment = async (currUser, { markerId, commentId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("addComment error!")
  }
  await mongoDB();
  await Marker.findByIdAndUpdate(markerId, {
    $push: { comments: commentId }
  })
}

export const removeComment = async (currUser, { markerId, commentId }) => {
  if (currUser == null || markerId == null || commentId == null) {
    throw new Error("removeComment error!")
  }
  await mongoDB();
  await Marker.findByIdAndUpdate(markerId, {
    $pull: { comments: commentId }
  })
}