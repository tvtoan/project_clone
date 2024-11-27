import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfilePage.module.scss";
import classNames from "classnames/bind";
import { useAuth } from "../context/AuthContext";
import {
  getUserById,
  updateCoverPicture,
  updateProfilePicture,
} from "../services/authService";
import { getPostsByUserId } from "../services/postService";
import Layout from "../components/Layout/Layout";
import Post from "../components/Post/Post";
import CreatePost from "../components/Post/CreatePost";
import { useParams } from "react-router-dom";
import Icons from "../components/Shared/Icon";
import defaultAvt from '../img/default.jpg';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const { user } = useAuth();
  const { userId: id } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const profilePictureRef = useRef(null);
  const coverPictureRef = useRef(null);

  // get info user
  const fetchUserData = async () => {
    try {
      if (!id) return;
      const data = await getUserById(id); 
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // get posts list
  const fetchUserPosts = async () => {
    try {
      if (!id) return;
      const posts = await getPostsByUserId(id);
      setUserPosts(posts.reverse());
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, [id]);

  const handleProfileClick = () => {
    profilePictureRef.current?.click();
  };

  const handleCoverClick = () => {
    coverPictureRef.current?.click();
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedUser = await updateProfilePicture(file);
        setUserData(updatedUser); // Update info user
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const handleCoverPictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const updatedUser = await updateCoverPicture(file);
        setUserData(updatedUser); 
      } catch (error) {
        console.error("Error updating cover picture:", error);
      }
    }
  };

  const handlePostCreated = (newPost) => {
    setUserPosts((prevPosts) => [newPost, ...prevPosts]);
  };

 

  if (!user) {
    return <p>You must log in to view this page</p>;
  }

  return (
    <Layout>
      <div className={cx("profile-page")}>
        {/* Cover Picture */}
        <div className={cx("cover-picture")}>
          <img
            src={
              userData?.coverPicture
                ? `http://localhost:3001${userData.coverPicture}`
                : "/default-cover.jpg"
            }
            alt="Cover"
            className={cx("cover-img")}
          />
          <input
            ref={coverPictureRef}
            type="file"
            accept="image/*"
            onChange={handleCoverPictureChange}
            className={cx("upload-input")}
          />
          <button onClick={handleCoverClick} className={cx("custom-cover")}>
            <Icons.Camera />
          </button>
        </div>

        {/* User Info */}
        <div className={cx("user-info")}>
          <img
            src={
              userData?.profilePicture
                ? `http://localhost:3001${userData.profilePicture}`
                : defaultAvt
            }
            alt="Avatar"
            className={cx("avatar")}
          />
          <input
            ref={profilePictureRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className={cx("upload-input")}
          />
          <button onClick={handleProfileClick} className={cx("custom-profile")}>
            <Icons.Camera />
          </button>
          <p className={cx("username")}>{userData?.username}</p>
        </div>

        {/* User Posts */}
        <div className={cx("user-posts")}>
          <CreatePost onPostCreated={handlePostCreated} userId={id} />
          <ul style={{ listStyle: "none" }}>
            {userPosts.map((post) => (
              <li key={post._id}>
                <Post post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
