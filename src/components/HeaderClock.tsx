import Link from "next/link";
import { Logo } from "./Logo";

type HeaderClockProps = {
  variant?: "v1" | "v2" | "v3";
};

export function HeaderClock({ variant = "v1" }: HeaderClockProps = {}) {
  const leftClass = variant === "v1" ? "left" : "left p-0";
  return (
    <div className="tf-header-wrap">
      <Link href="/" className="logo-site d-lg-none" aria-label="Saquib Ali Home">
        <Logo width={40} height={40} />
      </Link>
      <div className={leftClass}>
        <div className="time-local text-body-3">
          <p className="date" />
          <p className="clock" />
        </div>
      </div>
    </div>
  );
}
