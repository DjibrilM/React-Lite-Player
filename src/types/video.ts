import React from "react";

export type VideoProps = {
  // eslint-disable-next-line
  onSubtitleLoadFail?: (error: any) => void;
  // eslint-disable-next-line
  subtitleUrl?: string | any;
  // eslint-disable-next-line
  subtitleLanguage?: string | any;
  subtitleColor?: string;
  // eslint-disable-next-line
  url: string | any;
  poster?: string;
  enableNextButton?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  next?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  previous?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
  width?: number | string;
  height?: number;
  wrapperBackrgound?: string;
  errorMessage?: string;
  customeErrorMessageComponent?: React.JSX.Element;
  loop?: boolean;
  hiddeVideoWhenError?: boolean;
  corssOrigin?: "anonymous" | "use-credentials";
  subtitleBackground?: string;
  bufferedIndicatorBackground?: string;
  playerProgressBarContainer?: string;
  videoProgressBckground?: string;
  autoPlay?: boolean;
  customeControlsArea?: React.JSX.Element;
};

export type PlayerState = {
  loadedMetaData: boolean;
  videoDuration: string;
  currentDuration: string;
  error: boolean;
  waiting: boolean;
  playbackspeed: number;
};


export interface ForwardedRef {
  togglePlay: () => void;
  toggleCaptions: () => void;
  togglePictureMode: () => void;
  toggleMute: () => void;
  video: HTMLVideoElement;
  toggleFullscreen:()=> void
  
}