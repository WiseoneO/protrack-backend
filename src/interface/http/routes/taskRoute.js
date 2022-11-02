const router = require("express").Router();
const {
    createIndividualTask,
    createTeamTask,
    departmentTask,
    addTeamMember,
    addDepartmentMember,
    removeTeamMember,
    removeDepartmentMember,
    updateIndividualTask,
    updateTeamTask,
    updatedepartmentTask,
    deleteIndividualTask,
    deleteTeamTask,
    deleteDepartmentTask,
    allUserTasks,
    singleUserTasks,
    allTeamTask,
    specificTeamTask,
    allDepartmentTask,
    specificDepartmentTask} = require("../controllers/taskController");
    const checkPremium = require('../utils/checkPremium');

const verifyToken= require("../middlewares/verifyUser")
// Individual Task
router.get("/", verifyToken,allUserTasks);
router.get("/:taskId/single-task", verifyToken,singleUserTasks);
router.get("/teamTasks", verifyToken,checkPremium, allTeamTask);
router.get("/:taskId/teamTask", verifyToken,specificTeamTask);
router.get("/departmentTasks", verifyToken,allDepartmentTask);
router.get("/:taskId/departmentTask", verifyToken,specificDepartmentTask);
router.post("/create-task", verifyToken, createIndividualTask);
router.post("/create-teamTask", verifyToken, createTeamTask);
router.post("/create-departmentTask", verifyToken, departmentTask);
router.post("/:taskId/create-team/:id", verifyToken,addTeamMember);
router.post("/:taskId/create-department-Member/:id", verifyToken,addDepartmentMember);
router.put("/:id/update", verifyToken,updateIndividualTask);
router.put("/:id/update-team", verifyToken,updateTeamTask);
router.put("/:id/update-department", verifyToken,updatedepartmentTask);
router.delete("/:taskId/remove-team-member/:id", verifyToken,removeTeamMember);
router.delete("/:taskId/remove-department-member/:id", verifyToken,removeDepartmentMember);
router.delete("/:taskId/delete-single-task", verifyToken,deleteIndividualTask);
router.delete("/:taskId/delete-team-task", verifyToken,deleteTeamTask);
router.delete("/:taskId/delete-department-task", verifyToken,deleteDepartmentTask);

module.exports = router;