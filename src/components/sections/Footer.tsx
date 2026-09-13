import { ImageSwitch } from "@/components/ImageSwitch";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <div id="footer" className="tf-footer flat-spacing">
      <div className="block-quote effectFade fadeUp no-div">
        <h5 className="quote-text font-3 fw-normal text-black-72">
          <span className="text-black-56">“</span>
          The best architectures are quiet—they absorb complexity in the background so human creativity can operate without friction in the foreground.
          <span className="text-black-56">”</span>
        </h5>
        <p className="quote-author font-3 text-black-56 h6 text-end">Saquib Ali</p>
      </div>
      <div className="br-line" />
      <div className="foot-inner">
        <div className="isak effectFade fadeUp no-div">
          <svg viewBox="0 0 354 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text
              x="0"
              y="130"
              fontSize="90"
              fontWeight="900"
              className="text-black-72"
              style={{
                fontFamily: "var(--font-3), sans-serif",
                letterSpacing: "-4px",
                fill: "currentColor",
                opacity: 0.72
              }}
            >
              SAQUIB
            </text>
          </svg>
        </div>
        <a href="#home" className="f-logo effectFade fadeZoom" aria-label="Back to top">
          <div className="logo">
            <Logo width={32} height={32} />
          </div>
        </a>
      </div>
      <div className="foot-bottom">
        <p className="text-nocopy text-black-56 effectFade fadeUp no-div">
          All rights reserved <br />© 2026 Saquib Ali
        </p>
        <div className="isak effectFade fadeUp no-div">
          <svg viewBox="0 0 428 162" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text
              x="0"
              y="130"
              fontSize="90"
              fontWeight="900"
              className="text-black-72"
              style={{
                fontFamily: "var(--font-3), sans-serif",
                letterSpacing: "-4px",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.5px",
                opacity: 0.56
              }}
            >
              ALI
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
