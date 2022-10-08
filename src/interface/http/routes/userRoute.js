const router = require("express").Router();
const {signupUser,changePassword,createTeam,uploadAvatar}= require("../controllers/usersController")

const verifyToken= require("../middlewares/verifyUser")

router.post("/signUp", signupUser);
router.put("/change-password", verifyToken,changePassword);
router.post("/:id/create-team", verifyToken,createTeam);
// router.route("/upload-avatar/:id/upload", verifyToken).post(uploadAvatar)
module.exports = router 