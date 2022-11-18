import express from 'express' 
const router = express.Router();
import { signupUser, changePassword } from "../controllers/usersController.mjs";

import verifyToken from "../middlewares/verifyUser.mjs";
router.post("/signUp", signupUser);
// router.post("/update-user", update);
router.put("/change-password", verifyToken,changePassword);
// router.route("/upload-avatar/:id/upload", verifyToken).post(uploadAvatar)
export default router 