import Message from "../model/message";


// create message
export const createMessage = async (req, res) => {
    const {conversationId, text} = req.body;
    

    if(!conversationId || !text) {
        res.status(400).json({message: "Conversation Id and message text are require"});
    }

    const newMessage = new Message({
        conversationId,
        senderId: req.user.id,
        text,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

// get messages from 1 conversation
export const getMessages = async (req, res) => {
   
    const {conversationId} = req.params

    if(!conversationId) {
        res.status(404).json({message: "Conversation Id is require"})
    }
    
    try {
           
        const messages = await Message.find({conversationId}).sort({createAt: 1});
        res.status(200).json(messages)
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

