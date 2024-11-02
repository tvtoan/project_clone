import mongoose, { mongo, Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, max: 500 },
    image: { type: String },
    likes: { type: Array, default: [] },
    comments:[ {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        createAt: { type: Date, default: Date.now}  
    }]
}, {timestamps: true });

export default mongoose.model('Post', postSchema);


