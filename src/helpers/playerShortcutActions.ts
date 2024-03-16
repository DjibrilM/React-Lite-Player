export const shortcut = (
  event: KeyboardEvent,
  video: React.MutableRefObject<HTMLVideoElement | undefined | null>,
  togglePlay: () => void
) => {
  switch (event.key.toLowerCase()) {
    case "arrowleft":
      video.current?.currentTime &&
        (video.current.currentTime = video.current?.currentTime - 0.5);
      break;
    case "arrowright":
      video.current?.currentTime &&
        (video.current.currentTime = video.current?.currentTime + 0.5);
      break;
    case " ":
      togglePlay();
      break;

    default:
      break;
  }
};
