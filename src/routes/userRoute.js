const router = require("express").Router();
const config = require("../../config/defaults");

const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middlewares/verifyUser")


module.exports = router