import React, { useEffect, useState } from "react";
import { getVideos } from "../services/videoService";
import VideoList from "../components/Video/VideoList";
import Layout from '../../src/components/Layout/Layout';

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
    <Layout >

      <div>
        <VideoList />
      </div>
    </Layout>
  );
};

export default VideoPage;
