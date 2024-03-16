//try to reload the video once the network is back
export const retryToReload = (video: HTMLVideoElement | undefined | null) => {
  window.addEventListener("online", () => {
     video?.load(); // try to reload the video
  });
};


