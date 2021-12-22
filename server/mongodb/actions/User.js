import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDB from "../index";
import User from "../models/User";

export async function login({ username, password }) {
  if (username == null || password == null) {
    throw new Error("All parameters must be provided!");
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
    console.log("email")
    console.log(email)
    console.log("username")
    console.log(username)
    console.log("pass")
    console.log(password)
    throw new Error("All parameters must be provided!");
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

export const getUserFromToken = async (token) => {
  if (token == null) {
    throw new Error("User is not signed in!");
  }

  await mongoDB();

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: id });

    if (user == null) {
      throw new Error();
    }

    return {
      id,
      username: user.username,
    };
  } catch (e) {
    throw new Error("Invalid token!");
  }
};
