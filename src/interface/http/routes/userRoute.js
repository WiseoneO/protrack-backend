const router = require("express").Router();
const {signupUser,uploadAvatar}= require("../controllers/users")


const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyUser")

router.route("/signUp").post(signupUser)
// router.route("/upload-avatar/:id/upload", verifyToken).post(uploadAvatar)
module.exports = router 