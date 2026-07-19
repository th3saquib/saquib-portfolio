import Image from "next/image";

type Props = {
  showCloudItem?: boolean;
  showVideo?: boolean;
  containerClass?: string;
  videoSrc?: string;
};

export function BodyBackground({
  showCloudItem = true,
  showVideo = true,
  containerClass = "",
  videoSrc = "/assets/images/overlay-2.mp4",
}: Props = {}) {
  const normalizedVideoSrc = videoSrc
    ? videoSrc.startsWith("/") || videoSrc.startsWith("http")
      ? videoSrc
      : `/${videoSrc}`
    : "/assets/images/overlay-2.mp4";

  return (
    <div className={`body-background${containerClass ? " " + containerClass : ""}`}>
      {showCloudItem && (
        <div className="bg-item">
          <Image loading="lazy" width={1440} height={900} src="/assets/images/item/cloud-bg.png" alt="background" />
        </div>
      )}
      {showVideo && (
        <div className="bg-video video-light">
          <video key={normalizedVideoSrc} className="video" src={normalizedVideoSrc} muted autoPlay loop playsInline>
            {/* Fallback */}
          </video>
          <div className="overlay-1" />
        </div>
      )}
    </div>
  );
}
