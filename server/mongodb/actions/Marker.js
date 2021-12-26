import mongoDB from "../index"
import Marker from "../models/Marker"
import User from "../models/User"
import { addMarker, removeMarker } from "./User"

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
      select: "_id username",
    })
    .populate({
      path: "likes",
      model: "User",
      select: "_id username",
    })
    .exec()


  if (marker == null) {
    throw new Error("getMarker find error!")
  } else {
    return marker
  }
};

export async function createMarker(currUser, { lat, lng, name, description, priv }) {
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
    description,
    priv
  }).then(async (marker) => {
    await addMarker(currUser, {
      markerId: marker._id,
    });
    return marker;
  })
}


export const deleteMarker = async (currUser, { markerId }) => {
  if (currUser == null) {
    throw new Error("error with currUser in deleteMarker (mongodb/actions/marker)");
  } else if (markerId == null) {
    throw new Error("error with markerId in deleteMarker (mongodb/actions/marker)");
  }

  await mongoDB();

  return Marker.findOneAndDelete({ _id: id, user: currUser.id }).then(async (deleted) => {
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