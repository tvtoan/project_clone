import express from 'express';
import { register, login, verifyToken, getCurrentUser} from '../controllers/authController';
const router = express.Router();

router.post("/register",register);
router.post("/login", login);

router.get("/current", verifyToken, getCurrentUser);


export default router;
