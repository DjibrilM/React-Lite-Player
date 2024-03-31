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

| prop                        | Description                                              | Default               |
| --------------------------- | -------------------------------------------------------- | --------------------- |
| url                         | Your video URL                                           | No default.           |
| subtitleUrl                 | Your subtitle file's URL                                 | No default.           |
| subtitleLanguage            | Subtitle language                                        | English               |
| subtitleColor               | Subtitle text color                                      | #ffff                 |
| poster                      | Poster image URL                                         | No default.           |
| enableNextButton            | Show next and previous buttons                           | False                 |
| onPlay                      | Event triggered upon the commencement of playback        |                       |
| onPause                     | Event triggered when the video pauses                    | No default.           |
| next                        | Function called when pressing the next button            | Undefined             |
| previous                    | Function called when pressing the previous button        | Undefined             |
| width                       | Video width                                              | 100%                  |
| height                      | Video height                                             | Auto                  |
| wrapperBackground           | Video container background                               | #333                  |
| errorMessage                | Error message displayed when an error occurs             | Something went wrong. |
| customErrorMessageComponent | Custom error component; having one overrides the default | Null                  |
| loop                        | Allow video to play in a loop                            | False                 |
| hideVideoWhenError          | Hide the video when an error occurs                      | True (recommended)    |
| crossOrigin                 | Video cross-origin property                              | Anonymous             |
| subtitleBackground          | Subtitle background                                      | #000000a3             |
| bufferedIndicatorBackground | Background of the loaded-buffer progress                 | Undefined             |
| videoProgressBackground     | Video progress background                                | #ffff                 |
| autoPlay                    | Play the video immediately after loading                 | False                 |
| playerProgressBarContainer  | Progress bar container                                   | #9d9d9d34             |
