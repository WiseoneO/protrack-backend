const router = require("express").Router();
const {CreateTask,} = require("../controllers/taskController");
const verifyToken= require("../middlewares/verifyUser")

router.post("/create-task", verifyToken, CreateTask);
module.exports = router 
