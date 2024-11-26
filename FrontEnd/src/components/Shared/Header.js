import React, { useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import Icons from "./Icon";
import { getUserByUsername } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const Header = () => {
  const { user } = useAuth();
  const [active, setActive] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  

  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate(`/profile/${user._id}`)
  }
  const handleSearch = async (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchTerm(query);

    if (query) {
      try {
        const results = await getUserByUsername(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className={cx("header")}>
      <div className={cx("header-left")}>
        <Icons.Facebook
          className={cx("header-logo")}
          style={{ color: "blue" }}
        />
        <div className={cx("header-search")}>
          <Icons.Search />
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className={cx("search-results")}>
              {searchResults.map((user) => (
                <div key={user._id} className={cx("search-result-item")}>
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={cx("header-center")}>
        <div
          className={cx("header-options", { active: active === "home" })}
          onClick={() => setActive("home")}
        >
          <Icons.Home />
        </div>
        <div
          className={cx("header-options", { active: active === "friend" })}
          onClick={() => setActive("friend")}
        >
          <Icons.Friend />
        </div>
        <div
          className={cx("header-options", { active: active === "video" })}
          onClick={() => setActive("video")}
        >
          <Icons.Video />
        </div>
        <div
          className={cx("header-options", { active: active === "market" })}
          onClick={() => setActive("market")}
        >
          <Icons.Market />
        </div>
        <div
          className={cx("header-options", { active: active === "group" })}
          onClick={() => setActive("group")}
        >
          <Icons.Group />
        </div>
      </div>
      <div className={cx("header-right")}>
        <Icons.Messenger className={cx("header-icon")} />
        <Icons.Notification className={cx("header-icon")}  />
        <img
          src={`http://localhost:3001${user?.profilePicture}`}
          className={cx("img")}
          onClick={handleAvatarClick}
        />
      </div>
    </div>
  );
};

export default Header;
