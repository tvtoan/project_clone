
import React, { useEffect, useState } from "react";
import { createPost } from '../../services/postService';

const CreatePost = ({ onPostCreated, userId }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Lưu file vào state
        if (file) {
            setPreview(URL.createObjectURL(file)); // Tạo preview ảnh\
            console.log(preview)
        } else {
            setPreview(null);
        }
    };

    useEffect(() => {
        console.log(preview);
    }, [preview])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();  // Tạo FormData chỉ ở frontend
        formData.append('userId', userId);  // Thêm userId
        formData.append('description', content);  // Thêm content bài viết

        if (image) {
            formData.append('image', image);  // Thêm ảnh vào FormData
        }

        try {
            const newPost = await createPost(formData);  // Gửi dữ liệu qua API
            onPostCreated(newPost);  // Callback khi tạo bài viết thành công
            setContent('');  // Reset form
            setImage(null);  // Reset image
            setPreview(null);  // Reset preview
        } catch (error) {
            console.error("Error creating post", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <input type="file" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100px' }} />}  {/* Hiển thị ảnh preview */}
            <button type="submit">Post</button>
        </form>
    );
};

export default CreatePost;
