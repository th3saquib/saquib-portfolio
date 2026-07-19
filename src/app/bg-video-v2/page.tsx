import { HomeShell } from "@/components/HomeShell";

export default function BgVideoV2() {
    return (
        <HomeShell
            defaultMode="dark"
            showVideoBg={true}
            videoSrc="assets/images/overlay-3.mp4"
            bodyClass="counter-scroll video-v1"
        />
    );
}
