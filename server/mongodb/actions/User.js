import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDB from "../index";
import Marker from "../models/Marker";
import User from "../models/User";
import Comment from "../models/Comment"
import { getMarker } from "./Marker"

export const verifyToken = async (req, res) => {
  const token = req.cookies?.token
  if (token == null) {
    throw new Error("Mongodb/actions/verifyToken, user not logged in")
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {

      return decoded
    }
    res.setHeader("Set-Cookie", "token=; Max-Age=0; SameSite=Lax; Path=/");
    throw new Error("Mongodb/actions/verifyToken, decode error")
  })
}

export const updateUser = async (currUser, updates) => {
  if (currUser == null || updates == null) {
    throw new Error("updateUser error!")
  }
  await mongoDB()
  const user = await User.findOneAndUpdate({ _id: currUser.id }, updates)
}

export const getBasicUser = async (token) => {
  if (token == null) {
    throw new Error("getBasicUser error!");
  }

  await mongoDB();

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: id })


    if (user == null) {
      throw new Error();
    }

    return {
      id,
      username: user.username,
      profileImg: user.profileImg
    };
  } catch (e) {
    throw new Error("Invalid token!");
  }
};

export async function getAllUsers(cookies) {
  await mongoDB();
  try {
    const users = await User.find({}, { email: 0, password: 0 })
    if (users == null) {
      throw new Error("Couldn't find any users in getAllUsers mongodb/actions!")
    }
    return users
  } catch (e) {
    throw new Error("Error getting users")
  }

}

// SECTION: authentication //
export async function login({ username, password }) {
  if (username == null || password == null) {
    throw new Error("Login error! (mongodb/actions/user) All parameters must be provided!");
  }

  await mongoDB();

  const user = await User.findOne({ username });

  if (user != null) {
    const didMatch = await bcrypt.compare(password, user.password);

    if (!didMatch) {
      throw new Error("The password you entered is incorrect!");
    }
  } else {
    throw new Error("User does not exist!");
  }

  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export async function signUp({ email, username, password }) {


  if (email == null || username == null || password == null) {

    throw new Error("Signup error! (mongodb/actions/user) All parameters must be provided!");
  }
  if (password.length <= 3) {
    throw new Error("Please enter a password longer than 3 characters!")
  }

  await mongoDB();

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        email,
        username,
        password: hashedPassword,
      })
    )
    .then((user) =>
      jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      )
    );
}


// SECTION: friends //

export const getUserFriends = async (currUser, { userId }) => {
  if (currUser == null || userId == null) {
    throw new Error("getUserFriends error!")
  }
  await mongoDB();

  const user = await User.findById(userId)
    .populate({
      path: "friends",
      model: "User",
      select: "_id username profileImg"
    })
    .exec()

  if (user == null) {
    throw new Error("getUserFriends find error!")
  } else {
    return user.friends
  }
}

export const addFriend = async (currUser, { friendId }) => {
  if (currUser == null || friendId == null) {
    throw new Error("addFriend error!")
  }

  await mongoDB();

  await User.findByIdAndUpdate(currUser.id, {
    $push: { friends: friendId },
  })
  await User.findByIdAndUpdate(friendId, {
    $push: { friends: currUser.id },
  })
};

export const removeFriend = async (currUser, { friendId }) => {
  if (currUser == null || friendId == null) {
    throw new Error("removeFriend error!")
  }

  await mongoDB();

  await User.findByIdAndUpdate(currUser.id, {
    $pull: { friends: friendId },
  })
  await User.findByIdAndUpdate(friendId, {
    $pull: { friends: currUser.id },
  })
};

// SECTION: friend requests //


export const getUserFriendRequests = async (currUser) => {
  if (currUser == null) {
    throw new Error("getUserFriendRequests error!")
  }
  await mongoDB();

  const user = await User.findById(currUser.id)
    .populate({
      path: "pendingFRequests",
      model: "User",
      select: "_id username profileImg bio location registerDate friends markers"
    })
    .exec()

  if (user == null) {
    throw new Error("getUserFriendRequests find error!")
  } else {
    return user.pendingFRequests
  }
}

export const sendFriendRequest = async (currUser, { friendRequestId }) => {
  if (currUser == null || friendRequestId == null) {
    throw new Error("sendFriendRequest error!")
  }

  await mongoDB();
  return User.findByIdAndUpdate(friendRequestId, {
    $push: { pendingFRequests: currUser.id },
  })
}

export const rejectFriendRequest = async (currUser, { friendRequestId }) => {
  if (currUser == null || friendRequestId == null) {
    throw new Error("rejectFriendRequest error!")
  }

  await mongoDB();
  return User.findByIdAndUpdate(currUser.id, {
    $pull: { pendingFRequests: friendRequestId },
  })
}

export const acceptFriendRequest = async (currUser, { friendRequestId }) => {
  if (currUser == null || friendRequestId == null) {
    throw new Error("acceptFriendRequest error!")
  }

  await mongoDB();
  return User.findByIdAndUpdate(currUser.id, {
    $pull: { pendingFRequests: friendRequestId },
  }).then(async (data) => {
    await addFriend(currUser, {
      friendId: friendRequestId,
    });
    return data;
  })
}



// SECTION: markers //
export const getSpecificUser = async (currUser, { userId }) => {
  if (currUser == null || userId == null) {
    throw new Error("getSpecificUser error!")
  }
  await mongoDB();
  const user = await User.find({ _id: userId }, { password: 0, email: 0, friends: 0, pendingFRequests: 0, markers: 0, likedMarkers: 0 })
  if (user == null) {
    throw new Error("getSpecificUser find error!")
  } else {
    return user
  }
}



export const getUserMarkers = async (currUser, { userId }) => {

  if (currUser == null) {
    throw new Error("getUserMarkers error!")
  }
  await mongoDB();
  const extraParams = { user: userId }
  if (currUser.id != userId) {
    extraParams.priv = false
  }

  const markers = await Marker.find(extraParams)
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

  if (markers == null) {
    throw new Error("getUserMarkers find error!")
  } else {
    return markers
  }

}

export const getUserLikedMarkers = async (currUser) => {

  if (currUser == null) {
    throw new Error("getUserMarkers error!")
  }
  await mongoDB();

  const user = await User.findById(currUser.id)

  if (user == null) {
    throw new Error("getUserLikedMarkers find error!")
  } else {
    return user.likedMarkers
  }

}


export const addMarker = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("addMarker error!")
  }

  await mongoDB();

  return User.findByIdAndUpdate(currUser.id, {
    $push: { markers: markerId },
  })
};



export const removeMarker = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("removeMarker error!")
  }

  await mongoDB();

  return User.findByIdAndUpdate(currUser.id, {
    $pull: { markers: markerId },
  })
};

