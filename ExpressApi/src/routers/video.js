import express from 'express'
import { uploadVideo, getVideos, getVideo, deleteVideo, addComment } from '../controllers/videoController'
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router()
const upload = multer({dest: 'uploadVideos'}); // setup link upload videos

router.post('/', authMiddleware, upload.single('video'), uploadVideo);
router.get('/', authMiddleware, getVideo);
router.get('/:id', authMiddleware, getVideos);
router.delete('/:id', authMiddleware, deleteVideo);

export default router;