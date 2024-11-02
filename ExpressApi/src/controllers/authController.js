import User from '../model/user';
import bcrypt from 'bcryptjs/dist/bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const user = new User({ username, email, password: await bcrypt.hash(password, 10)})
        await user.save();
        res.status(201).json({message: "User registered successfully"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};