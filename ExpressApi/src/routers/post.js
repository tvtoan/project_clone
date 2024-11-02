import express from 'express';
import { createPost, getPost,getPosts, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPost);
router.delete('/:id', authMiddleware, deletePost);

export default router;