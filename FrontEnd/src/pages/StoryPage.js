import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoryById } from "../services/storyService";
import styles from "./Story.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const StoryPage = () => {
    const { id } = useParams(); // Lấy ID của Story từ URL
    const [story, setStory] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await getStoryById(id);
                setStory(data);
            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };
        fetchStory();
    }, [id]);

    if (!story) return <p>Loading...</p>;

    return (
        <div className={cx("story-page")}>
            <h1>Story Details</h1>
            <img src={`http://localhost:3001/${story.image}`} alt="Story" />
            <p>{story.text}</p>
        </div>
    );
};

export default StoryPage;
