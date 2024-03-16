//css can be found within the main.css
import React from "react";
import Visible from "../common/Visible";

interface Props {
  showNextbuttons: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// The following component returns the play button that shows when the video is posed
// it also display the previous and next button for small screens
const PlayerButton: React.FC<Props> = ({ onClick, showNextbuttons }) => {
  return (
    <div className="centered-conrols">
      <Visible visible={showNextbuttons}>
        <button className="centered-previous-btn">
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
        style={{ cursor: "pointer" }}
        className="player-button"
        onClick={onClick}
      >
        <svg
          className="centered-play"
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

        <svg
          className="centered-pause"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="3em"
          width="3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
        </svg>
      </button>

      <Visible visible={showNextbuttons}>
        <button className="centered-next-btn">
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
  );
};

export default PlayerButton;
