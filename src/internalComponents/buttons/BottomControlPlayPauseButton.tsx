//css can be found within the main.css file

import React from "react";
import Visible from "../common/Visible";

interface Props {
  loadedMetaData: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | undefined | null>;
  error: boolean;
  enableNextButton: boolean;
  previous: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
  next: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
}

const BottomControlPlayPauseButton: React.FC<Props> = ({
  loadedMetaData,
  error,
  videoRef,
  enableNextButton,
  previous,
  next,
}) => {
  return (
    <>
      <div className="play-pause-next-previous-container">
        <Visible visible={enableNextButton}>
          <button
            className="control-next-button"
            disabled={error}
            onClick={previous}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"></path>
            </svg>
          </button>
        </Visible>

        <button
          disabled={error || !loadedMetaData}
          className="play"
          onClick={() => videoRef.current && videoRef.current.play()}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z"
              strokeWidth="0"
              fill="currentColor"
            ></path>
          </svg>
        </button>

        <button
          onClick={() => videoRef.current && videoRef.current.pause()}
          className="pause"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
          </svg>
        </button>

        <Visible visible={enableNextButton}>
          <button className="control-next-button" onClick={next}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
            </svg>
          </button>
        </Visible>
      </div>
    </>
  );
};

export default BottomControlPlayPauseButton;
