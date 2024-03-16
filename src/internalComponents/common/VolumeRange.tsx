import React, { useRef, useState } from "react";
import "../../assets/styles/volumeRange.css";

interface Props {
  toggleMute: () => void;
  currentDuration: string;
  videoDuration: string;
  updateVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeRange: React.FC<Props> = ({
  updateVolume,
  toggleMute,
  currentDuration,
  videoDuration,
}) => {
  const rangeRef = useRef<HTMLInputElement>(null);
  const [rangeLocalValue, setRangeLocalValue] = useState<number>(0.5);
  const timerRef = useRef<HTMLParagraphElement>(null);

  function hiddeTimerOnHover() {
    if (window.screen.width <= 800) {
      timerRef.current && (timerRef.current.style.opacity = "0");
    }
  }

  function showTimeOnMouseleave() {
    timerRef.current && (timerRef.current.style.opacity = "1");
  }

  return (
    <div
      onMouseLeave={showTimeOnMouseleave}
      className="volume-control-container"
    >
      <div className="volume-control">
        <button
          onClick={toggleMute}
          onMouseEnter={hiddeTimerOnHover}
          className="volume-button"
        >
          <svg
            className="muted-volume-icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m7.727 6.313-4.02-4.02-1.414 1.414 18 18 1.414-1.414-2.02-2.02A9.578 9.578 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.13 8.13 0 0 1-1.671 4.914l-1.286-1.286C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V2.132L7.727 6.313zM4 17h2.697L14 21.868v-3.747L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></path>
          </svg>

          <svg
            className="high-volume-icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></path>
            <path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z"></path>
          </svg>

          <svg
            className="medium-volume-icon"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zM16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5z"></path>
          </svg>
        </button>

        <div className="volume-range-container">
          <div
            style={{
              width:
                rangeLocalValue > 0 ? `${rangeLocalValue * 100 - 0.3}%` : 0,
            }}
            className="range-value-track"
          ></div>
          <input
            defaultValue={rangeLocalValue}
            ref={rangeRef}
            onChange={(e) => {
              updateVolume(e);
              setRangeLocalValue(+e.target.value);
            }}
            max={1}
            step={0.1}
            type="range"
            name=""
            id=""
          />
        </div>
      </div>

      <div className="time-track" ref={timerRef}>
        <p className="current-duration">{currentDuration || "0:00"}</p>
        <span>/</span>
        <p className="total-duration">{videoDuration || ". . ."}</p>
      </div>
    </div>
  );
};

export default VolumeRange;
