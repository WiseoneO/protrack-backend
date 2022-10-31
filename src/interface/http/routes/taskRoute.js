const router = require("express").Router();
const {
    CreateIndividualTask,
    createTeamTask,
    departmentTask,
    addTeamMember,
    addDepartmentMember,
    removeTeamMember,
    // removeDepartmentMember,
    updateIndividualTask,
    updateTeamTask,
    updatedepartmentTask,
    removeDepartmentMember} = require("../controllers/taskController");

const verifyToken= require("../middlewares/verifyUser")

router.post("/create-task", verifyToken, CreateIndividualTask);
router.post("/create-teamTask", verifyToken, createTeamTask);
router.post("/create-departmentTask", verifyToken, departmentTask);
router.post("/:taskId/create-team/:id", verifyToken,addTeamMember);
router.post("/:taskId/create-department-Member/:id", verifyToken,addDepartmentMember);
router.put("/:id/update", verifyToken,updateIndividualTask);
router.put("/:id/update-team", verifyToken,updateTeamTask);
router.put("/:id/update-department", verifyToken,updatedepartmentTask);
router.delete("/:taskId/remove-team-member/:id", verifyToken,removeTeamMember);
router.delete("/:taskId/remove-department-member/:id", verifyToken,removeDepartmentMember);



module.exports = router 
