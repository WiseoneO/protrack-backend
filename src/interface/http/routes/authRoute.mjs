import express from 'express';
const router = express.Router()
import { login, verifyToken, sendPasswordLink, resetUserPassword } from "../controllers/authContorller.mjs";


router.route("/login").post(login)
router.route("/verify/:id/:token").get(verifyToken)
router.route("/forgot-password/user/").post(sendPasswordLink)
router.route("/user/reset/:id/:token").post(resetUserPassword)

export default router