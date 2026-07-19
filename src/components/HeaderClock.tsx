import { ImageSwitch } from "./ImageSwitch";
import { Logo } from "./Logo";

type HeaderClockProps = {
  variant?: "v1" | "v2" | "v3";
};

export function HeaderClock({ variant = "v1" }: HeaderClockProps = {}) {
  const leftClass = variant === "v1" ? "left" : "left p-0";
  return (
    <div className="tf-header-wrap">
      <a href="/" className="logo-site d-lg-none">
        <Logo width={40} height={40} />
      </a>
      <div className={leftClass}>
        <div className="time-local text-body-3">
          <p className="date" />
          <p className="clock" />
        </div>
      </div>
    </div>
  );
}
