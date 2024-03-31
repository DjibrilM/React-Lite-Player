import React, {
  useReducer,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";

import "../../assets/styles/main.css";
import "../../assets/styles/videoProgress.css";
import "../../assets/styles/rightControls.css";
import { VideoProps } from "../../types/video";
import Visible from "../../internalComponents/common/Visible";
import VolumeRange from "../../internalComponents/common/VolumeRange";
import { PlayerState } from "../../types/video";
import Loader from "../../internalComponents/common/Loader";
import PlayButton from "../../internalComponents/buttons/PlayButton";
import RightControls from "../../internalComponents/common/RightControls";
import { getVideoDuration } from "../../helpers/getVideoDuration";
import BottomControlPlayPauseButton from "../../internalComponents/buttons/BottomControlPlayPauseButton";
import { retryToReload } from "../../helpers/reloadOnNetworkRestore";
import { shortcut } from "../../helpers/playerShortcutActions";
import { isTextFieldFocused } from "../../helpers/checkActiveElement";
import { ForwardedRef } from "../../types/video";

const Video = forwardRef<ForwardedRef, VideoProps>(
  (
    {
      loop = false,
      url,
      subtitleLanguage,
      subtitleUrl,
      enableNextButton = false,
      onPlay,
      onPause,
      next,
      previous,
      height,
      width,
      wrapperBackrgound,
      errorMessage,
      customeErrorMessageComponent,
      hiddeVideoWhenError = true,
      corssOrigin = "anonymous",
      subtitleColor,
      poster,
      subtitleBackground,
      playerProgressBarContainer,
      bufferedIndicatorBackground,
      videoProgressBckground,
      autoPlay,
      customControlsArea,
    },
    ref
  ) => {
    const playerContainerRef = React.useRef<HTMLDivElement>(null);
    const progressRangeInput = React.useRef<HTMLInputElement>(null);

    // eslint-disable-next-line
    const videoRef = React.useRef<HTMLVideoElement | any>(null);
    const videoProgressValueIndicator = React.useRef<HTMLDivElement>(null);
    const videoLoadedBufferIndicator = React.useRef<HTMLDivElement>(null);
    const cutomTrackElement = React.useRef<HTMLParagraphElement>(null);

    const captions = useMemo(
      // eslint-disable-next-line
      () => videoRef.current?.textTracks[0] as any,
      [videoRef?.current]
    );

    const [
      {
        loadedMetaData,
        videoDuration,
        currentDuration,
        error,
        waiting,
        playbackspeed,
      },
      dispatch,
    ] = useReducer(
      (prev: PlayerState, next: Partial<PlayerState>) => ({ ...prev, ...next }),
      {
        loadedMetaData: false,
        videoDuration: "",
        currentDuration: "",
        error: false,
        waiting: false,
        playbackspeed: 1,
      }
    );

    function onVideoPlay() {
      playerContainerRef.current?.classList.remove("paused");
      playerContainerRef.current?.classList.add("touched");
      onPlay && onPlay();
    }

    function onVideoPause() {
      playerContainerRef.current?.classList.add("paused");
    }

    function togglePlay() {
      if (!videoRef.current?.paused) {
        videoRef?.current?.pause();
        onPause && onPause();
      } else {
        videoRef.current?.play();
        onPlay && onPlay();
      }
    }

    //updateVolumeBased on the volume slider
    function updateVolume(e: React.ChangeEvent<HTMLInputElement>): void {
      if (+e.target.value > 0)
        videoRef.current && (videoRef.current.muted = false);
      videoRef.current && (videoRef.current.volume = +e.target.value);
    }

    //update volume slider icons based on the volume stage
    function onVolumeChange(e: React.ChangeEvent<HTMLVideoElement>) {
      if (e.target.muted || e.target.volume <= 0) {
        playerContainerRef.current &&
          (playerContainerRef.current.dataset.volumeLevel = "muted-volume");
      } else if (e.target.volume >= 0.5) {
        playerContainerRef.current &&
          (playerContainerRef.current.dataset.volumeLevel = "high-volume");
      } else if (e.target.volume < 0.5 && e.target.volume > 0.01) {
        playerContainerRef.current &&
          (playerContainerRef.current.dataset.volumeLevel = "low-volume");
      }
    }

    function toggleMute() {
      if (videoRef.current?.muted) {
        videoRef.current.muted = false;
      } else {
        videoRef.current && (videoRef.current.muted = true);
      }
    }

    function updateCurrentVideoDurationRange() {
      const currentDurationInpercentage =
        (videoRef.current!.currentTime * 100) / videoRef.current!.duration;

      videoProgressValueIndicator.current &&
        (videoProgressValueIndicator.current.style.width = `${currentDurationInpercentage}%`);
    }

    function onVideoTimeUpdate() {
      const currentTime = videoRef.current?.currentTime || 0;
      dispatch({ currentDuration: getVideoDuration(currentTime) });
      updateCurrentVideoDurationRange();

      // eslint-disable-next-line
      progressRangeInput.current!.value = videoRef.current?.currentTime as any;
    }

    function updateLoadingProgress() {
      // event: React.SyntheticEvent<HTMLVideoElement, Event> | any
      if (!videoRef.current!.buffered) return;
      const bufferedEnd = videoRef.current!.buffered.end(
        videoRef.current!.buffered.length - 1
      );
      const duration = videoRef.current!.duration;
      if (videoLoadedBufferIndicator && duration > 0) {
        videoLoadedBufferIndicator.current!.style.width =
          (bufferedEnd / duration) * 100 + "%";
      }
    }

    function updateVideoCurrentTime(e: React.ChangeEvent<HTMLInputElement>) {
      videoRef.current!.currentTime = +e.target.value;
      updateCurrentVideoDurationRange();
    }

    function toggleFullscreen() {
      if (document.fullscreenElement) {
        playerContainerRef.current?.classList.remove("fullscreen-open");
        document.exitFullscreen();
      } else {
        playerContainerRef.current?.requestFullscreen();
        playerContainerRef.current?.classList.add("fullscreen-open");
      }
    }

    function togglePictureMode() {
      if (!document.pictureInPictureElement) {
        videoRef.current!.requestPictureInPicture();
        playerContainerRef.current?.classList.add("in-picture-mode");
      } else {
        document.exitPictureInPicture();
        playerContainerRef.current?.classList.remove("in-picture-mode");
      }
    }

    function toggleCaptions() {
      const isHidden =
        captions.mode === "hidden" || captions.mode === "disabled";

      if (captions) {
        captions.mode = isHidden ? "showing" : "hidden";
        if (isHidden) {
          playerContainerRef.current?.classList.add("captions");
        } else {
          playerContainerRef.current?.classList.remove("captions");
        }
      }
    }

    function addVideoPlaybackSpeed(speed: number) {
      dispatch({ playbackspeed: speed });
      videoRef.current && (videoRef.current.playbackRate = speed);
    }

    const onCanPlayThrough = () => {
      dispatch({ waiting: false, error: false });
    };

    const onVideoWait = () => {
      dispatch({ waiting: true });
    };

    useEffect(() => {
      captions?.addEventListener("cuechange", () => {
        const cue = captions.activeCues && captions.activeCues[0]["text"];
        cutomTrackElement.current &&
          (cutomTrackElement.current.innerText = cue);
      });
    }, [captions]);

    useEffect(() => {
      if (captions) {
        playerContainerRef.current?.classList.add("captions");
        captions.mode = "showing";
      }
      //reload once online
      retryToReload(videoRef?.current);
      //
      document.addEventListener("keydown", (e) => {
        if (!isTextFieldFocused()) {
          shortcut(e, videoRef, togglePlay);
        }
      });

      return () => {
        document.removeEventListener("keydown", (e) => {
          if (!isTextFieldFocused()) {
            shortcut(e, videoRef, togglePlay);
          }
        });
      };
    }, []);

    //
    useImperativeHandle(ref, () => ({
      togglePlay,
      toggleCaptions,
      togglePictureMode,
      toggleMute,
      video: videoRef.current,
      toggleFullscreen,
    }));

    return (
      <div
        data-volume-level="high-volume"
        style={{
          background: wrapperBackrgound,
          height: height,
          width: width,
        }}
        ref={playerContainerRef}
        className="player paused high-volume"
      >
        <Visible visible={!error && poster}>
          <img
            onClick={() => {
              togglePlay();
            }}
            className="poster-img"
            src={poster}
            alt="video-poster"
          />
        </Visible>

        {/* //centered play-pause-button */}
        <Visible visible={!error && !waiting}>
          <PlayButton showNextbuttons={enableNextButton} onClick={togglePlay} />
        </Visible>

        <Visible visible={waiting && !error}>
          <div className="loading-spiner-container">
            <Loader />
          </div>
        </Visible>

        <Visible visible={customeErrorMessageComponent && error}>
          <div className="custom-error-message-component">
            {customeErrorMessageComponent}
          </div>
        </Visible>

        <Visible visible={error && !customeErrorMessageComponent}>
          <div className="video-error-message">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </svg>
            <p>{errorMessage ? errorMessage : "Something Went Wrong."}</p>
          </div>
        </Visible>

        <video
          autoPlay={autoPlay}
          onDoubleClick={toggleFullscreen}
          crossOrigin={corssOrigin}
          loop={loop}
          onLoadStart={() => dispatch({ waiting: true })}
          onCanPlayThrough={onCanPlayThrough}
          onWaiting={onVideoWait}
          onError={() => dispatch({ error: true, waiting: false })}
          onProgress={updateLoadingProgress}
          onTimeUpdate={onVideoTimeUpdate}
          onLoadedMetadata={() => {
            const duration = videoRef.current?.duration || 0;
            dispatch({
              loadedMetaData: true,
              videoDuration: getVideoDuration(duration),
            });
          }}
          onVolumeChange={onVolumeChange}
          onClick={togglePlay}
          onPause={onVideoPause}
          onPlay={onVideoPlay}
          ref={(video: HTMLVideoElement) => (videoRef.current = video)}
          src={url}
          style={{
            aspectRatio: "16/9",
            visibility: hiddeVideoWhenError && error ? "hidden" : "visible",
          }}
        >
          <track
            style={{ visibility: "hidden" }}
            className="track"
            kind="captions"
            srcLang={subtitleLanguage}
            src={subtitleUrl}
          />
          <source onLoad={() => dispatch({ waiting: false })} src={url} />
        </video>

        <div className="controls-container">
          {/* progess-bar */}
          <div
            style={{ background: playerProgressBarContainer }}
            className="player-progress-bar-container"
          >
            <input
              ref={progressRangeInput}
              onChangeCapture={updateVideoCurrentTime}
              disabled={!loadedMetaData}
              max={videoRef.current?.duration}
              type="range"
            />
            <div
              style={{ background: videoProgressBckground }}
              ref={videoProgressValueIndicator}
              className="player-progress-value-indicator"
            >
              <div
                style={{ background: videoProgressBckground }}
                className="custom-thumb"
              ></div>
            </div>
            <div
              style={{ background: bufferedIndicatorBackground }}
              ref={videoLoadedBufferIndicator}
              className="loaded-buffer-indicator"
            ></div>
          </div>

          {/* controls(play-pause-next-previous) */}
          <div className="controls">
            <BottomControlPlayPauseButton
              loadedMetaData
              videoRef={videoRef}
              error={error}
              enableNextButton={enableNextButton}
              previous={previous!}
              next={next!}
            />

            <VolumeRange
              currentDuration={currentDuration}
              videoDuration={videoDuration}
              toggleMute={toggleMute}
              updateVolume={updateVolume}
            />

            <RightControls
              customControlArea={customControlsArea}
              disableCaption={!subtitleUrl}
              toggleCaptions={toggleCaptions}
              error={error}
              changePlaybackRate={addVideoPlaybackSpeed}
              togglePictureMode={togglePictureMode}
              enterFullscreem={toggleFullscreen}
              playbackSpeed={playbackspeed}
            />
          </div>
        </div>

        <Visible visible={subtitleUrl?.length > 0}>
          <div className="cutom-track-element">
            <p
              style={{
                color: subtitleColor,
                background: subtitleBackground,
              }}
              ref={cutomTrackElement}
            ></p>
          </div>
        </Visible>
      </div>
    );
  }
);

Video.displayName = "video-player";

export default Video;
