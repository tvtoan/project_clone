import React, { useEffect, useState } from "react";
import {getStories} from '../services/storyService';

const StoryPage = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStories = async () => {
        try {
            const fetchedStories = await getStories();
            setStories(fetchedStories);
        } catch (error) {
            console.error('Error fetching stories',error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStories(); // get list stories 
    }, []);

    if(loading) return <div> Loading Stories...</div>

    return (
        <div>
            <h1>Stories</h1>
            <ul>
                {stories.map(story => (
                    <li key = {story._id}>
                        <h3>User ID: {story.userId}</h3>
                        <img src ={story.image} alt ="story" />
                        <p>{story.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
} 

export default StoryPage;