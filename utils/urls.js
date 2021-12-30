export default {
  // NOTE: For nextjs apps, instead of BASE_URL, consider using NEXT_PUBLIC_VERCEL_URL
  // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  dbUrl: process.env.MONGODB_URI ?? "mongodb://localhost:27017",
  jwtSecret: process.env.JWT_SECRET,
  pages: {
    index: "/",
    ssr: "/ssr",
    login: "/login",
    register: "/register", 
    app: {
      map: "/app",
      profile: {
        get: (userId)=>{return("/app/profile" + userId)},
      },
      explore: "/app/explore", 
      friends: "/app/friends"

    },
  },
  api: {
    example: "/api/example",
    user: {
      signUp: "/api/user/sign-up",
      login: "/api/user/login",
      logout: "/api/user/logout",
      getCurrent: "/api/user/get-current",
      addFriend: "/api/user/addFriend",
      addMarker: "/api/user/addMarker",
      getAllUsers: "/api/user/getAllUsers",
      getUserFriendRequests: "/api/user/getUserFriendRequests",
      getUserFriends: "/api/user/getUserFriends",
      getUserMarkers: "/api/user/getUserMarkers",
      rejectFriendRequest: "/api/user/rejectFriendRequest",
      acceptFriendRequest: "/api/user/acceptFriendRequest",
      removeFriend: "/api/user/removeFriend",
      removeMarker: "/api/user/removeMarker",
      sendFriendRequest: "/api/user/sendFriendRequest",
      
    },
    marker: {
      createMarker: "/api/marker/createMarker",
      deleteMarker: "/api/marker/deleteMarker",
      getMarker: "/api/marker/getMarker",
      likeMarker: "/api/marker/likeMarker", 
      unlikeMarker: "/api/marker/unlikeMarker", 
    }, 
    comment: {
      createComment: "/api/comment/createComment"
    }

  },
};
