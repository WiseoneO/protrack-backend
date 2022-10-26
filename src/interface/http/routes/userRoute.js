const router = require("express").Router();
const {signupUser,changePassword,uploadAvatar}= require("../controllers/usersController")

const verifyToken= require("../middlewares/verifyUser")

router.post("/signUp", signupUser);
router.put("/change-password", verifyToken,changePassword);
// router.route("/upload-avatar/:id/upload", verifyToken).post(uploadAvatar)
module.exports = router 