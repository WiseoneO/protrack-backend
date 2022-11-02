const router = require("express").Router();
const {signupUser,changePassword,update,uploadAvatar}= require("../controllers/usersController")

const verifyToken= require("../middlewares/verifyUser")

router.post("/signUp", signupUser);
// router.post("/update-user", update);
router.put("/change-password", verifyToken,changePassword);
// router.route("/upload-avatar/:id/upload", verifyToken).post(uploadAvatar)
module.exports = router 