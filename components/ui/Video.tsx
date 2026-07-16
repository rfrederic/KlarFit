import { forwardRef, VideoHTMLAttributes } from "react";

/**
 * Thin wrapper around the native `<video>` element that defaults to `muted`
 * so nothing autoplays with sound by surprise — every exercise demo video in
 * the app should render through this component instead of a raw `<video>`
 * tag. Pass an explicit `muted` prop (as the fullscreen player's tap-to-unmute
 * control does) to opt out on purpose; omit it and you always get muted.
 */
const Video = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(function Video(
  { muted, ...props },
  ref
) {
  return <video ref={ref} {...props} muted={muted ?? true} />;
});

export default Video;
