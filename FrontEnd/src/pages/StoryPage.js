import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoryById } from "../services/storyService";
import styles from './Story.module.scss';
import classNames from "classnames/bind";
import User from "../components/Shared/User";

const cx = classNames.bind(styles);

const StoryPage = () => {

    const {storyId} = useParams();
    const [story, setStory] = useState(null);
    const [error, setError] = useState("");

    const fetchStory = async () => {
        try {
            const data = await getStoryById(storyId);
            setStory(data);
        }catch(error) {
            console.error("Error fetching story details:" ,error);
            setError("Story not found");
        }
    };
    useEffect(() => {
        fetchStory();
    }, [storyId]);

    if(error) {
        return <div className = {cx('error')}>{error}</div>
    }

    return (
        <div className = {cx('story-page')}>
            <div className = {cx('story-details')}>
                <div className={cx('story-header')}>
                    <User />
                    <p>{story.userId.username}</p>
                </div>
                <div className={cx('story-content')}>
                    <p>{story.text}</p>
                    {story.image && (
                        <img 
                            src = {`http://localhost:3001${story.image}`}
                            alt = "story content"
                            className={cx('story-image')}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default StoryPage;