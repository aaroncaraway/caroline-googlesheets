import React from 'react';
import parse from 'html-react-parser';

const VideoGallery = ({ videoData }) => (
  <div className="dashboard-container">
    <h1>VIDEOS</h1>
    {videoData &&
      videoData.map((video) => parse(`<div>${video.content['$t']}</div>`))}
  </div>
);

export default VideoGallery;
