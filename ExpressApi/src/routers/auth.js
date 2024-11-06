import express from 'express';
import { register, login, verifyToken, getCurrentUser, getUserByUsername} from '../controllers/authController';
const router = express.Router();

router.post("/register",register);
router.post("/login", login);

router.get("/current", verifyToken, getCurrentUser);
router.get("/users", getUserByUsername);


export default router;
