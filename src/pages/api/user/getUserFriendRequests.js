import { getUserFriendRequests, verifyToken } from "../../../../server/mongodb/actions/User";


const handler = (req, res) =>
    verifyToken(req, res)
        .then((currUser) => getUserFriendRequests(currUser))
        .then((data) =>
            res.status(200).json({
                success: true,
                payload: data,
            })
        )
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        });

export default handler;
