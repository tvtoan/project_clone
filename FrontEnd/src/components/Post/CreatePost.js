import React, { useState } from "react";
import {createPost} from '../../services/postService';

const CreatePost = ({onPostCreated, userId}) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.file[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('description', content);
        
        if(image) formData.append('image', image);

        try {
            const newPost = await createPost(formData);
            onPostCreated(newPost);
            setContent('');
            setImage(null);
        } catch (error) {
            console.error("Error creating post" , error)
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mine"
            />
            <input type="file" onChange = {handleImageChange} />
            <button type="submit" >Post</button>

        </form>
    )
};

export default CreatePost;