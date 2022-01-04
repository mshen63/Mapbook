import { authedGetRequest, authedPostRequest } from "../../utils/requests";
import urls from "../../utils/urls";

export const signUp = (email, username, password) =>
  fetch(urls.baseUrl + urls.api.user.signUp, {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("signUp src/action/user");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const login = (username, password) =>
  fetch(urls.baseUrl + urls.api.user.login, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("login src/action/user");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const logout = () =>
  fetch(urls.baseUrl + urls.api.user.logout, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("logout src/action/user");
      }

      return json.success;
    });



export const getCurrentUser = (cookies) => {
  const conditionals = {};

  if (cookies != null) {
    conditionals.headers = {
      cookie: cookies,
    };
  }

  return fetch(urls.baseUrl + urls.api.user.getCurrent, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
    ...conditionals,
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("getCurrentUser src/action/user");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

export const getAllUsers = (cookies) =>
  authedGetRequest(
    urls.baseUrl + urls.api.user.getAllUsers,
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getAllUsers src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });

export const addFriend = (cookies, friendId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.addFriend,
    { friendId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("addFriend src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });


export const addMarker = (cookies, markerId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.addMarker,
    { markerId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("addMarker src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });




export const sendFriendRequest = (cookies, friendRequestId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.sendFriendRequest,
    { friendRequestId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("sendFriendRequest src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });

export const rejectFriendRequest = (cookies, friendRequestId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.rejectFriendRequest,
    { friendRequestId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("rejectFriendRequest src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });

export const acceptFriendRequest = (cookies, friendRequestId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.acceptFriendRequest,
    { friendRequestId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("acceptFriendRequest src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });


export const removeFriend = (cookies, friendId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.removeFriend,
    { friendId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("removeFriend src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });


export const removeMarker = (cookies, markerId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.removeMarker,
    { markerId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("removeMarker src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });

export const updateUser = (cookies, updates) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.updateUser,
    updates,
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getUserFriendRequests src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });


export const getUserFriendRequests = (cookies) =>
  authedGetRequest(
    urls.baseUrl + urls.api.user.getUserFriendRequests,
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getUserFriendRequests src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });




export const getUserFriends = (cookies, userId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.getUserFriends,
    { userId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getUserFriends src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });


export const getUserMarkers = (cookies, userId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.user.getUserMarkers,
    { userId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getUserMarkers src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });

export const getUserLikedMarkers = (cookies) => {
  return authedGetRequest(
    urls.baseUrl + urls.api.user.getUserLikedMarkers,
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getUserLikedMarkers src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    })
};


export const getSpecificUser = (cookies, userId) =>

  authedPostRequest(
    urls.baseUrl + urls.api.user.getSpecificUser,
    { userId },
    cookies
  )
    .then((response) => response.json())
    .then((data) => {
      if (data == null) {
        throw new Error("getSpecificUser src/action/user");
      } else if (!data.success) {
        throw new Error(data.message);
      }
      return data.payload;
    });





