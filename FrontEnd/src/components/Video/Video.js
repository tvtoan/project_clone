import React from "react";

const Video = ({video}) => {
    return (
        <div>
            <h3>{video.description}</h3>
            <video controls >
                <source  src = {video.videoPath} type = "video/mp4" />
            </video>
        </div>
    )
};

export default Video