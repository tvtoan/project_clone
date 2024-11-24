import React from "react";
import {  useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import styles from './InboxPage.module.scss';
import classNames from "classnames/bind";
import InboxList from "../components/Inbox/InboxList";
import UserList from "../components/Shared/UserList";


const cx = classNames.bind(styles);

const InboxPage = () => {
  const { receiverId } = useParams();
  const {user, loading} = useAuth();
  console.log(receiverId)

  if(loading) {
    return <div>Loading...</div>
  }

  if(!user ) {
    return <div> Please login to view your inbox</div>
  }

  return (
    <div className = {cx('inbox-page')}>
      <div className={cx('user-list')}>
        <UserList />
      </div>
      <div className= {cx('message-section')}>
        {receiverId ? (
          <InboxList receiverId={receiverId} currentUser={user} />
        ):(
          <p>Select a user to start chatting</p>
        )}
      </div>
      
    </div>
  )

}


export default InboxPage;
