import React, { useEffect, useState } from "react";
import Video from "./Video";
import videoService from '../../services/videoService';

const VideoList =  () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await videoService.getVideos();
                setVideos(data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();

    }, []);
    return (
        <div>
            <h2>Videos</h2>
            {videos.length === 0 ? (
                <p>No videos available</p>
            ): (
                <ul>
                    {videos.map((video) => {
                        <li key = {video._id}>
                            <Video video = {video} />
                        </li>
                    })}
                </ul>
            ) }
        </div>
    );
};


export default VideoList;