import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import styles from "./InboxPage.module.scss";
import classNames from "classnames/bind";
import InboxList from "../components/Inbox/InboxList";
import UserList from "../components/Shared/UserList";
import Layout from "../../src/components/Layout/Layout";
import { getUserById } from "../services/authService";
const cx = classNames.bind(styles);

const InboxPage = () => {
  const { receiverId } = useParams();
  const { user, loading } = useAuth();
  const [receiver, setReceiver] = useState(null);
  console.log(receiver);
  console.log(user);

  const fetchReceiverData = async () => {
    try {
      const receiverData = await getUserById(receiverId);
      setReceiver(receiverData);
    } catch (error) {
      console.error("Error fetching receiver data", error);
    }
  };
  useEffect(() => {
    fetchReceiverData();
  }, [receiverId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div> Please login to view your inbox</div>;
  }

  return (
    <Layout>
      <div className={cx("inbox-page")}>
        <div className={cx("user-list")}>
          <UserList />
        </div>
        <div className={cx("message-section")}>
          {receiverId ? (
            <>
              <div className={cx("receiver-info")}>
                <img src={receiver?.profilePicture || ""} />
                <p>{receiver.username}</p>
              </div>
              <div className={cx('chat-area')}>
                <InboxList receiverId={receiverId} currentUser={user} />
              </div>
            </>
          ) : (
            <p>Select a user to start chatting</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InboxPage;
