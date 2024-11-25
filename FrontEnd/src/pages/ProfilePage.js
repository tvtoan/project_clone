import React, { useEffect, useState } from "react";
import styles from "./ProfilePage.module.scss";
import classNames from "classnames/bind";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser } from "../services/authService";
import { getPostsByUserId } from "../services/postService";
import Layout from "../components/Layout/Layout";
import Post from "../components/Post/Post";
import CreatePost from "../components/Post/CreatePost";
import VideoList from "../components/Video/VideoList";

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    const fetchUserPosts = async () => {
      if (user && user._id) {
        try {
          const posts = await getPostsByUserId(user._id);
          setUserPosts(posts || []);
        } catch (error) {
          console.error("Error fetching posts", error);
        }
      }
    };

    fetchUserPosts();
    fetchUserData();
  }, [user]);

  console.log(userData);
  console.log(userPosts);

  if (!user) {
    return <p>You must log in to view this page</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className={cx("profile-page")}>
        {/* Cover Picture */}
        <div className={cx("cover-picture")}>
          <img
            src={userData.coverPicture || "/default-cover.jpg"}
            alt="Cover"
            className={cx("cover-img")}
          />
        </div>

        {/* User Info */}
        <div className={cx("user-info")}>
          <img
            src={userData.profilePicture || "/default-avatar.jpg"}
            alt="Avatar"
            className={cx("avatar")}
          />
          <p className={cx("username")}>{userData.username}</p>
        </div>

        {/* User Posts */}
        <div className={cx("user-posts")}>
          {/* <CreatePost onPostCreated={handlePostCreated} userId={userId} /> */}

          <ul style={{ listStyle: "none" }}>
            {userPosts.map((post) => (
              <li key={post._id}>
                <Post post={post} />
              </li>
            ))}
          </ul>
          <div style = {{width:"100%"}}>
            {/* <VideoList /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
