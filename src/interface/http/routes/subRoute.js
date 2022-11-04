const router = require("express").Router();
const {activateSub} = require('../controllers/subscriptionController');
const verifyToken= require("../middlewares/verifyUser")

router.post('/activate-sub', verifyToken, activateSub);

module.exports = router 