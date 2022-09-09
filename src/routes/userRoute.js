const router = require("express").Router();
const {signupUser}= require("../controllers/users")


const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyUser")

router.route("/signUp").post(signupUser)
module.exports = router 