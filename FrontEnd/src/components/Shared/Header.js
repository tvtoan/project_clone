import React, { useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import {
  FaBell,
  FaFacebookMessenger,
  FaSearch,
  FaUserFriends,
  FaStore,
} from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { MdOutlineGroup } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";

import { getUserByUsername } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import defaultAvt from "../../img/default.jpg";

const cx = classNames.bind(styles);
const Header = () => {
  const { user } = useAuth();
  const [active, setActive] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate(`/profile/${user._id}`);
  };
  console.log(active);

  const handleIconClick = (iconName) => {
    setActive(iconName);
  };
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
        <FaFacebookF className={cx("header-logo")} />
        <div className={cx("header-search")}>
          <FaSearch className={cx("header-icon")} style={{ padding: "10px" }} />
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
                  <img
                    src={
                      user.profilePicture
                        ? `http://localhost:3001${user?.profilePicture}`
                        : defaultAvt
                    }
                    className={cx("img")}
                  />

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
          onClick={() => handleIconClick("home")}
        >
          <AiFillHome
            className={cx("header-icon")}
            onClick={() => navigate("/home")}
          />
        </div>
        <div
          className={cx("header-options", { active: active === "friend" })}
          onClick={() => handleIconClick("friend")}
        >
          <FaUserFriends
            className={cx("header-icon")}
            onClick={() => navigate("/home")}
          />
        </div>
        <div
          className={cx("header-options", { active: active === "video" })}
          onClick={() => handleIconClick("video")}
        >
          <PiVideoFill
            className={cx("header-icon")}
            onClick={() => navigate("/video")}
          />
        </div>
        <div className={cx("header-options")}>
          <FaStore className={cx("header-icon")} />
        </div>
        <div className={cx("header-options")}>
          <MdOutlineGroup
            className={cx("header-icon", { active: active === "inbox" })}
            onClick={() => handleIconClick("inbox")}
          />
        </div>
      </div>
      <div className={cx("header-right")}>
        <FaFacebookMessenger
          className={cx("header-icon")}
          onClick={() => navigate("/inbox/:id")}
        />
        <FaBell className={cx("header-icon")} />
        <img
          src={
            user?.profilePicture
              ? `http://localhost:3001${user?.profilePicture}`
              : defaultAvt
          }
          className={cx("img")}
          onClick={handleAvatarClick}
        />
      </div>
    </div>
  );
};

export default Header;
