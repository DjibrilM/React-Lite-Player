import React, { useRef, LegacyRef } from "react";
import { Video } from "..";
import useVideoRef from "../util/hooks/useVideoRef";

export default {
  title: "Video",
  component: Video,
};

export const VideoStory = () => {
  const ref = useVideoRef();

  return (
    <>
      <button onClick={() => ref.current?.togglePlay()}>click me</button>
      <Video
        ref={ref}
        url="https://res.cloudinary.com/dgbujfxvt/video/upload/v1709235498/Video_wdv92e.mp4"
        subtitleLanguage={"en"}
        subtitleUrl={
          "https://res.cloudinary.com/dgbujfxvt/raw/upload/v1709235088/subtitles_jmzkze.vtt"
        }
        loop
        corssOrigin="anonymous"
        enableNextButton={true}
        bufferedIndicatorBackground="green"
        playerProgressBarContainer="red"
        videoProgressBckground="yellow"
      />
    </>
  );
};
