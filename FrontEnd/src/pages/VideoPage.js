import React, { useEffect, useState } from "react";
import { getVideos } from "../services/videoService";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <div>Loading Videos...</div>;

  return (
    <div>
      <h1>Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h3>User ID: {video.userId}</h3>
            <video controls width="300">
              <source src={video.videoPath} type="video/mp4" />
              Your browser does not support the video tag
            </video>
            <p>description: {video.description}</p>
            <p>Likes: {video.likes}</p>
            <h4>Comments</h4>
            <ul>
              {video.comments.map((comment, index) => (
                <li key={index}>
                  <strong>User ID: {comment.userId}</strong>: {comment.comment}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoPage;
