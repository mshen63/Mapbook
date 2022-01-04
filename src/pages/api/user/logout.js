import { removeCookie } from "../../../../utils/tokens";
// doesn't need to lookg at the database, so doesnt need a function in mongodb actions
// @route   GET api/user/logout
// @desc    Logout current user
// @access  Public
const handler = (req, res) => {
  console.log(removeCookie())
  res.setHeader("Set-Cookie", removeCookie());
  console.log(res)
  return res.status(200).json({
    success: true,
  });
};

export default handler;
