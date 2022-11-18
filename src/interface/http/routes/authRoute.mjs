import express from 'express';
const router = express.Router()
import { login, verifyToken, sendPasswordLink, resetUserPassword } from "../controllers/authContorller.mjs";


router.post("/login", login)
router.get("/verify/:id/:token", verifyToken)
router.post("/forgot-password/user/", sendPasswordLink)
router.post("/user/reset/:id/:token", resetUserPassword)

export default router