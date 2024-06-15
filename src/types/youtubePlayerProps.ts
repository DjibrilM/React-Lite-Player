export type YoutubePlayerPermission = [
  "autoplay"?,
  "autoplay-with-sound"?,
  "encrypted-media"?,
  "fullscreen"?,
  "picture-in-picture"?,
  "gyroscope"?,
  "accelerometer"?,
  "clipboard-write"?,
  "caption"?,
  "annotations"?,
  "vr"?,
];

export type Props = {
  permission: YoutubePlayerPermission;
  height: string;
  minHeight?: string;
  maxHeight?: string;
  className?:string,

  width: string;
  minWidth?: string;
  maxWidth?: string;
};
