const router = require("express").Router();
const {activateSub,getUserSubscriptions} = require('../controllers/subscriptionController');
const verifyToken= require("../middlewares/verifyUser")

router.post('/subscribe', verifyToken, activateSub);
router.get('/:id/single-user', verifyToken, getUserSubscriptions);

module.exports = router 