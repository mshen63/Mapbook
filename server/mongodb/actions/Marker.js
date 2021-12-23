import dbConnection from "../index"
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

  const marker = Marker.findById(markerId)
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

  if (marker==null) {
    throw new Error("getMarker find error!")
  } else {
    return marker
  }
};

export async function createMarker(currUser, { lat, lng, name, description, private }) {
  if (currUser == null) {
    throw new Error("You must be logged in to add a marker!");
  }
  if (lat == null || lng == null || name == null || description == null || private == null) {
    console.log("lat" + lat)
    console.log("lng" + lng)
    console.log("name" + name)
    console.log("description" + description)
    console.log("private" + private)
    throw new Error("Please provide all fields!")
  }

  return Marker.create({
    user: currUser._id,
    lat,
    lng,
    name,
    description,
    private
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

  return Marker.findOneAndDelete({ _id: id, user: currUser._id}).then(async (deleted) => {
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