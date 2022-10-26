const router = require("express").Router();
const {
    CreateIndividualTask,
    createTeamTask,
    departmentTask,
    addTeamMember,
    addDepartmentMember,
    removeTeamMember,
    removeDepartmentMember,
    updateIndividualTask,
    updateTeamTask,
    updatedepartmentTask,
    getSingleTask,
    allUserTasks} = require("../controllers/taskController");
const verifyToken= require("../middlewares/verifyUser")

router.post("/create-task", verifyToken, CreateIndividualTask);
router.post("/create-teamTask", verifyToken, createTeamTask);
router.post("/create-departmentTask", verifyToken, departmentTask);
router.post("/:taskId/create-team/:id", verifyToken,addTeamMember);
router.post("/:taskId/create-department-Member/:id", verifyToken,addDepartmentMember);
router.delete("/:taskId/remove-team-member/:memberId", verifyToken,removeTeamMember);
router.delete("/:taskId/remove-department-member/:memberId", verifyToken,removeDepartmentMember);

router.put("/:id/update", verifyToken,updateIndividualTask);
router.put("/:id/update-team", verifyToken,updateTeamTask);
router.put("/:id/update-department", verifyToken,updatedepartmentTask);

router.get("/:id/oneTask", verifyToken,getSingleTask);
router.get("/allUserTasks", verifyToken,allUserTasks);

module.exports = router 
