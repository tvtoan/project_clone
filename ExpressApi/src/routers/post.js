import express from 'express';
import { createPost, getPost,getPosts, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb( null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', authMiddleware, upload.single('image'),(req, res, next) => {
    console.log(req.file);
    createPost(req, res, next);
});
router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPost);
router.delete('/:id', authMiddleware, deletePost);

export default router;