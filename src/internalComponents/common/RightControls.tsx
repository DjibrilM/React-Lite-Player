import React, { useEffect, useRef, useState } from "react";
import Visible from "./Visible";

interface Props {
  customeControlArea?: React.JSX.Element;
  disableCaption: boolean;
  toggleCaptions: () => void;
  error: boolean;
  changePlaybackRate: (speed: number) => void;
  playbackSpeed: number;
  enterFullscreem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  togglePictureMode: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const RightControls: React.FC<Props> = ({
  error,
  playbackSpeed,
  enterFullscreem,
  togglePictureMode,
  changePlaybackRate,
  toggleCaptions,
  disableCaption,
  customeControlArea,
}) => {
  const playbackspeedList = useRef<number[]>([0.25, 0.5, 1, 1.5, 1.75, 2]);
  const playbackspeedDropdown = useRef<HTMLButtonElement>(null);
  const [showPlaybackDropdown, setshowPlaybackDropdown] =
    useState<boolean>(false);

  useEffect(() => {
    if (showPlaybackDropdown) {
      showDropdown();
    } else {
      hideDropdown();
    }
  }, [showPlaybackDropdown]);

  const showDropdown = () => {
    if (playbackspeedDropdown.current) {
      playbackspeedDropdown.current.style.opacity = "1";
      playbackspeedDropdown.current.style.marginTop = "0px";
      playbackspeedDropdown.current.style.transitionDelay = "0s";
      playbackspeedDropdown.current.style.pointerEvents = "all";
      playbackspeedDropdown.current.focus();
    }
  };

  const hideDropdown = () => {
    if (playbackspeedDropdown.current) {
      playbackspeedDropdown.current.style.opacity = "0";
      playbackspeedDropdown.current.style.pointerEvents = "none";
      playbackspeedDropdown.current.style.marginTop = "10px";
    }
  };

  return (
    <div className="right-controls">
      <div className="cutom-controls-area">{customeControlArea}</div>

      <div className="playback-speed">
        <p className="selected" onClick={() => setshowPlaybackDropdown(true)}>
          {playbackSpeed}x
        </p>

        <button
          onBlur={() => setshowPlaybackDropdown(false)}
          style={{ background: "#000000c1" }}
          className="playback-speed-dropdown"
          ref={playbackspeedDropdown}
        >
          <div className="title">
            <p>Playback speed</p>
          </div>

          {playbackspeedList.current.map((speed, index) => (
            <div
              key={`right-control-speed-option-${index}`}
              onClick={() => changePlaybackRate(speed)}
              className={playbackSpeed === speed ? "active" : ""}
            >
              <Visible visible={playbackSpeed === speed}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path>
                </svg>
              </Visible>
              <span>{speed === 1 ? "Normal" : speed}</span>
            </div>
          ))}
        </button>
      </div>

      <Visible visible={!disableCaption}>
        <button
          className="caption-btn"
          onClick={toggleCaptions}
          disabled={error}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 576 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"></path>
          </svg>
        </button>
      </Visible>

      <button
        disabled={error}
        className="picture-mode-button"
        onClick={togglePictureMode}
      >
        <svg
          className="open-picture-mode"
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5H18C18.5523 5 19 5.44772 19 6V12.2676C18.7058 12.0974 18.3643 12 18 12H14C12.8954 12 12 12.8954 12 14V18C12 18.3643 12.0974 18.7058 12.2676 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      <button onClick={enterFullscreem}>
        <svg
          className="fullscreen-open-svg"
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z"
            fill="currentColor"
          ></path>
        </svg>

        <svg
          className="fullscreen-close-svg"
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 2C5.77614 2 6 2.22386 6 2.5V5.5C6 5.77614 5.77614 6 5.5 6H2.5C2.22386 6 2 5.77614 2 5.5C2 5.22386 2.22386 5 2.5 5H5V2.5C5 2.22386 5.22386 2 5.5 2ZM9.5 2C9.77614 2 10 2.22386 10 2.5V5H12.5C12.7761 5 13 5.22386 13 5.5C13 5.77614 12.7761 6 12.5 6H9.5C9.22386 6 9 5.77614 9 5.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2 9.5C2 9.22386 2.22386 9 2.5 9H5.5C5.77614 9 6 9.22386 6 9.5V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V10H2.5C2.22386 10 2 9.77614 2 9.5ZM9 9.5C9 9.22386 9.22386 9 9.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H10V12.5C10 12.7761 9.77614 13 9.5 13C9.22386 13 9 12.7761 9 12.5V9.5Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default RightControls;
