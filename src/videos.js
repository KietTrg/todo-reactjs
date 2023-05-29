import { forwardRef, useImperativeHandle, useRef } from "react";
import Video1 from "./videos/video.mp4";

function Video(props, ref) {
  const videoRef = useRef();
  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },
    pause() {
      videoRef.current.pause();
    },
  }));

  return <video ref={videoRef} src={Video1} width={300}></video>;
}
export default forwardRef(Video);
