import { createMessage, getMessages } from "../controllers/inboxController";
import express from 'express';
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/', authMiddleware, createMessage);
router.get('/:conversationId', authMiddleware, getMessages);

export default router;
