import Post from "../model/post";


export const createPost = async (req, res) => {

    const comments = req.body.comments?.map(comment => ({
        userId: req.user.id, 
        comment: comment.comment, 
        
    })) || [];
    
    const newPost = new Post({
        userId: req.user.id,
        description: req.body.description,
        image: req.file ? `/uploads/${req.file.filename}`: null,
        likes: req.body.likes,
        comments: comments,
    });
    
    try {
        const savedPost = await newPost.save();
       
        res.status(201).json(savedPost);
    } catch(error) {
        res.status(500).json({message:error.message});
    }
};

export const addComment = async ( req, res) => {
    const {id: postId} = req.params;
    
    const {comment } = req.body;

    try {
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({message: "Post not found"});
        }

        const newComment = {
            userId: req.user.id,
            comment: comment,
            createAt: new Date(),
        };

        post.comments.push(newComment);
        await post.save();

        // update post after add comment
        const updatedPost = await Post.findById(postId).populate({
            path: "comments.userId",
            select: "username profilePicture"
        })
        res.status(200).json(updatedPost);
    } catch (error ) {
        res.status(500).json({message: error.message});
    }
};

export const getPost = async (req, res) => {
    try { 
        const post = await Post.findById(req.params.id)
        .populate('userId', 'username profilePicture')
        .populate('comments.userId', 'username profilePicture');
        res.status(200).json(post);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const getPosts = async(req, res) => {
    try {
        const posts = await Post.find()
        .populate('userId', 'username profilePicture')
        .populate('comments.userId','username profilePicture');
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({userId: req.params.userId})
        .populate('userId', 'username profilePicture')
        .populate('comments.userId', 'username profilePicture');
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        if(post.userId.toString() === req.user.id) {
            await post.deleteOne();
            res.status(200).json({message: 'Post deleted'});
        } else {
            res.status(403).json({message:'You can delete only your post'});
        }
    } catch( error) {
        res.status(500).json({message: error.message});
    }
};