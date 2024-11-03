import React, { useEffect, useState } from "react";
import storyService from "../../services/storyService";
import Story from './Story';
const StoryList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storyService.getStories();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories: ", error);
      }
    };
    fetchStories();
  }, []);

  return (
    <div>
      <h2>Stories</h2>
      {stories.length === 0 ? (
        <p>No Stories available</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story._id}>
                <Story  story= {story}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
