import express from 'express';
import authRouter from './routers/auth';
import inboxRouter from './routers/inbox';
import postRouter from './routers/post';
import storyRouter from './routers/story';
import videoRouter from './routers/video';
import { connectDb } from './config/db';
import dotenv from 'dotenv'

// config for dotenv
dotenv.config();

const app = express();
// Middleware
app.use(express.json());

// connect Db   
connectDb(process.env.DB_URI)

// router
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/stories', storyRouter);
app.use('/api/videos', videoRouter);
app.use('/api/inbox', inboxRouter);


export const viteNodeApp = app;