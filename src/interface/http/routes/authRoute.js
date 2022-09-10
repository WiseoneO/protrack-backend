const router = require("express").Router();
const {login,verifyToken} = require("../controllers/auth");

router.route("/login").post(login)
router.route("/verify/:id/:token").get(verifyToken)

module.exports = router