import express from 'express';
import { register, login} from '../controllers/authController';
const router = express.Router();

router.post("/register",register);
router.post("/login", login);

router.post("/register", (req, res) => {
    console.log("Register")
})
router.post("/login", (req, res) => {
    console.log("login")
})


export default router;
