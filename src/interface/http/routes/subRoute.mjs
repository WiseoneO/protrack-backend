import express from 'express';
const router = express.Router()
import { activateSub, getUserSubscriptions } from '../controllers/subscriptionController.mjs';
import verifyToken from "../middlewares/verifyUser.mjs";

router.post('/subscribe', verifyToken, activateSub);
router.get('/:id/single-user', verifyToken, getUserSubscriptions);

export default router 