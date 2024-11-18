import React, { useEffect, useState } from "react";
import  { deleteStory, getStories } from "../../services/storyService";
import Story from './Story';
import styles from './StoryList.module.scss';
import classNames from 'classnames/bind'



const cx = classNames.bind(styles)

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getStories();
        setStories(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching stories: ", error);
      }
    };
    fetchStories();
  }, []);

  const handleDelete = async (storyId) => {
    try {
      await deleteStory(storyId);
      setStories(stories.filter(story => story._id !== storyId));

    } catch(error) {
      console.error("Error deleting story", error);
    }
  };

  if(loading) return <p>Loading Stories...</p>

  return (
    <div className={cx('story-list')}>
      <h2>Stories</h2>
      {stories.length === 0 ? (
        <p>No Stories available</p>
      ) : (
        <ul>
          {stories.map((story) => (
            <li key={story._id} className={cx('story-item')}>
                <Story  story= {story} />
                <button onClick={handleDelete(story._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StoryList;
