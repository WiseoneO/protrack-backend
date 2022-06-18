const router = require("express").Router();
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyUser")
const {getAllUsers} = require("../controllers/users")

// Admin route =>get all users
router.get("/", verifyTokenAndAdmin, getAllUsers)

module.exports = router