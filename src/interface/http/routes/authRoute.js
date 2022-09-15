const router = require("express").Router();
const {login,verifyToken,sendPasswordLink, resetUserPassword} = require("../controllers/auth");


router.route("/login").post(login)
router.route("/verify/:id/:token").get(verifyToken)
router.route("/forgot-password/user/").post(sendPasswordLink)
router.route("/user/reset/:id/:token").post(resetUserPassword)

module.exports = router