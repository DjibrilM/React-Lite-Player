<h1>React Lite Player</h1>

ReactLitePlayer player is a minimalistic video player aimed to offer simple usage with the least of features you need for your project, while making everything simple the library offers customization and call-back functions that you may want.

![React lite player diagram](https://res.cloudinary.com/dgbujfxvt/image/upload/v1711920639/Frame_2_y2kwcy.png)

<h4>installation</h4>

```ts
npm i react-lite-player
```

#### usage

```tsx
import { Video } from "r-lite-player";

function App() {
  return (
    <>
      <Video
        width={1000}
        url="your video url"
        subtitleUrl="your subti url" //optionl
      />
    </>
  );
}
```

##### Props

| prop                        | Description                                                                                                                                                                                                               | Default               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| url                         | Your video URL                                                                                                                                                                                                            | No default.           |
| subtitleUrl                 | Your subtitle file's URL                                                                                                                                                                                                  | No default.           |
| subtitleLanguage            | Subtitle language                                                                                                                                                                                                         | English               |
| subtitleColor               | Subtitle text color                                                                                                                                                                                                       | #ffff                 |
| poster                      | Poster image URL                                                                                                                                                                                                          | No default.           |
| enableNextButton            | Show next and previous buttons                                                                                                                                                                                            | False                 |
| onPlay                      | Event triggered upon the commencement of playback                                                                                                                                                                         |                       |
| onPause                     | Event triggered when the video pauses                                                                                                                                                                                     | No default.           |
| next                        | Function called when pressing the next button                                                                                                                                                                             | Undefined             |
| previous                    | Function called when pressing the previous button                                                                                                                                                                         | Undefined             |
| width                       | Video width                                                                                                                                                                                                               | 100%                  |
| height                      | Video height                                                                                                                                                                                                              | Auto                  |
| wrapperBackground           | Video container background                                                                                                                                                                                                | #333                  |
| errorMessage                | Error message displayed when an error occurs                                                                                                                                                                              | Something went wrong. |
| customErrorMessageComponent | Custom error component; having one overrides the default                                                                                                                                                                  | Null                  |
| loop                        | Allow video to play in a loop                                                                                                                                                                                             | False                 |
| hideVideoWhenError          | Hide the video when an error occurs                                                                                                                                                                                       | True (recommended)    |
| crossOrigin                 | Video cross-origin property                                                                                                                                                                                               | Anonymous             |
| subtitleBackground          | Subtitle background                                                                                                                                                                                                       | #000000a3             |
| bufferedIndicatorBackground | Background of the loaded-buffer progress                                                                                                                                                                                  | Undefined             |
| videoProgressBackground     | Video progress background                                                                                                                                                                                                 | #ffff                 |
| autoPlay                    | Play the video immediately after loading                                                                                                                                                                                  | False                 |
| playerProgressBarContainer  | Progress bar container                                                                                                                                                                                                    | #9d9d9d34             |
| customControlsArea          | his area is reserved for any elements you may want to add to the bottom-left side of the controllers, such as a subtitles drop-down or settings drop-down for the player. Just anything you may want to add to the player | null                  |

**Video Ref**

To allow full customization and control over the video, the video forwards its ref and some methods that you can access using the `useVideoRef` hook those methods are

| Method            | Use case                             |
| ----------------- | ------------------------------------ |
| togglePlay        | play and pause the video             |
| toggleCaptions    | show and hide the subtitle component |
| togglePictureMode | toggle picture mode                  |
| toggleMute        | Mute or unmute the video             |
| toggleFullscreen  | enter and exit full screen           |

The video can also but accessed from the ref but calling `ref.current.video`(the name ref depends on how you name your variable)

**Example use case**

```ts
import { Video, useVideoRef } from "react-lite-player";

function App() {
  const video = useVideoRef();

  function togglePlay() {
    video.current?.togglePlay();
  }

  return (
    <div>
      <button onClick={togglePlay}>toggle play</button>{" "}
      {/*//control the player from your component directly using the forwarded ref */}
      <Video ref={video} url={"url"} />
    </div>
  );
}

export default App;
```

If you find this library useful consider linking it on GitHub, or maybe why not contribute to it 😌😌
