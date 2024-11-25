import express from 'express';
import { register, login, verifyToken, getCurrentUser, getUserByUsername, getAllUsers, getUserById} from '../controllers/authController';
const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/users", getAllUsers);
router.get("/current", verifyToken, getCurrentUser);
router.get("/user", getUserByUsername);
router.get("/:id", getUserById);


export default router;
