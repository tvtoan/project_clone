import User from '../model/user';
import bcrypt from 'bcryptjs/dist/bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import user from '../model/user';

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

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {

        res.status(500).json({message: error.message});
    }
};

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Access Denied"});
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch( error) {
        res.status(400).json({message:"Invalid Token"});
    }
};

export const getUserByUsername = async (req, res) => {
    const {username} = req.query;

    if(!username) {
        return res.status(400).json({message: "Username is required"});
    }
    try {
        const users = await User.find({
            username: {$regex: username , $options : "i"} // "i" k phan biet chu hoa, chu thuong
        })
        if (users.length === 0) {
            return res.status(404).json({message: "No user found"});
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
