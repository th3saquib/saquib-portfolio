import { HomeShell } from "@/components/HomeShell";

export default function BgVideo() {
  return (
    <HomeShell
      defaultMode="dark"
      showVideoBg={true}
      videoSrc="assets/images/overlay-2.mp4"
      bodyClass="counter-scroll video-v1"
    />
  );
}
