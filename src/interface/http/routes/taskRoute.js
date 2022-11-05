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
    const {checkTeamSub,checkOrganizationSub} = require('../utils/checkPremium');

const verifyToken= require("../middlewares/verifyUser")
// Individual Task
router.get("/", verifyToken,allUserTasks);
router.get("/:taskId/single-task", verifyToken,singleUserTasks);
router.get("/teamTasks", verifyToken, checkTeamSub, allTeamTask);
router.get("/:taskId/teamTask", verifyToken, checkTeamSub,specificTeamTask);
router.get("/departmentTasks", verifyToken, checkOrganizationSub, allDepartmentTask);
router.get("/:taskId/departmentTask", verifyToken, checkOrganizationSub,specificDepartmentTask);
router.post("/create-task", verifyToken, createIndividualTask);
router.post("/create-teamTask", verifyToken, checkTeamSub, createTeamTask);
router.post("/create-departmentTask", verifyToken, checkOrganizationSub, departmentTask);
router.post("/:taskId/create-team/:id", verifyToken, checkTeamSub,addTeamMember);
router.post("/:taskId/create-department-Member/:id", verifyToken, checkOrganizationSub,addDepartmentMember);
router.put("/:id/update", verifyToken,updateIndividualTask);
router.put("/:id/update-team", verifyToken, checkTeamSub, updateTeamTask);
router.put("/:id/update-department", verifyToken, checkOrganizationSub, updatedepartmentTask);
router.delete("/:taskId/remove-team-member/:id", verifyToken, checkTeamSub, removeTeamMember);
router.delete("/:taskId/remove-department-member/:id", verifyToken, checkOrganizationSub, removeDepartmentMember);
router.delete("/:taskId/delete-single-task", verifyToken, deleteIndividualTask);
router.delete("/:taskId/delete-team-task", verifyToken,checkTeamSub, deleteTeamTask);
router.delete("/:taskId/delete-department-task", verifyToken, checkOrganizationSub,deleteDepartmentTask);

module.exports = router;