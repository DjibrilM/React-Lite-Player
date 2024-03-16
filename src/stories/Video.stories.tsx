import React from "react";
import { Video } from "..";

export default {
  title: "Video",
  component: Video,
};

export const VideoStory = () => {
  return (
    <Video
      url="https://res.cloudinary.com/dgbujfxvt/video/upload/v1709235498/Video_wdv92e.mp4"
      subtitleLanguage={"en"}
      loop
      corssOrigin="anonymous"
      enableNextButton={true}
      bufferedIndicatorBackground="green"
      playerProgressBarContainer="red"
      videoProgressBckground="yellow"
    />
  );
};
