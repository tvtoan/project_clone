import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: { type: String, required: true}, 
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    text: { type: String,   required: true},
});

export default mongoose.model('Message', messageSchema);