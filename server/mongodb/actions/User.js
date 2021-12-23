import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongo } from "mongoose";
import { string } from "prop-types";
import mongoDB from "../index";
import User from "../models/User";

export const verifyToken = async(req, res) => {
  const token = req.cookies?.token
  if (token==null) {
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
export const getUserFromToken = async (token) => {
  if (token == null) {
    throw new Error("getUserFromToken error!");
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
      username: user.username
    };
  } catch (e) {
    throw new Error("Invalid token!");
  }
};

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

export const getUserFriends = async (currUser) => {
  if (currUser == null) {
    throw new Error("getUserFriends error!")
  }
  await mongoDB();

  const user = User.findById(currUser._id)
    .populate({
      path: "friends",
      model: "User",
      select: "_id username color"
    })

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

  await User.findByIdAndUpdate(currUser._id, {
    $push: { friends: friendId },
  })
  await User.findByIdAndUpdate(friendId, {
    $push: { friends: currUser._id },
  })
};

export const removeFriend = async (currUser, { friendId }) => {
  if (currUser == null || friendId == null) {
    throw new Error("removeFriend error!")
  }

  await mongoDB();

  await User.findByIdAndUpdate(currUser._id, {
    $pull: { friends: friendId },
  })
  await User.findByIdAndUpdate(friendId, {
    $pull: { friends: currUser._id },
  })
};

// SECTION: friend requests //

export const getUserFriendRequests = async (currUser) => {
  if (currUser == null) {
    throw new Error("getUserFriendRequests error!")
  }
  await mongoDB();

  const user = User.findById(currUser._id)
    .populate({
      path: "pendingFRequests",
      model: "User",
      select: "_id username color"
    })

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
    $push: { pendingFRequests: currUser._id },
  })
}

export const rejectFriendRequest = async (currUser, { friendRequestId }) => {
  if (currUser == null || friendRequestId == null) {
    throw new Error("rejectFriendRequest error!")
  }

  await mongoDB();
  return User.findByIdAndUpdate(currUser._id, {
    $pull: { pendingFRequests: friendRequestId },
  })
}

// SECTION: markers //

export const getUserMarkers = async (currUser) => {
  if (currUser == null) {
    throw new Error("getUserMarkers error!")
  }
  await mongoDB();

  const user = User.findById(currUser._id)
    .populate({
      path: "markers",
      model: "Marker",
      select: "_id lat lng"
    })

  if (user == null) {
    throw new Error("getUserMarkers find error!")
  } else {
    return user.friends
  }
}


export const addMarker = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("addMarker error!")
  }

  await mongoDB();

  return User.findByIdAndUpdate(currUser._id, {
    $push: { markers: markerId },
  })
};

export const removeMarker = async (currUser, { markerId }) => {
  if (currUser == null || markerId == null) {
    throw new Error("removeMarker error!")
  }

  await mongoDB();

  return User.findByIdAndUpdate(currUser._id, {
    $pull: { markers: markerId },
  })
};

