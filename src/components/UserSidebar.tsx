import { ImageSwitch } from "./ImageSwitch";
import { Logo } from "./Logo";
import { profile } from "@/data/profile";

type UserSidebarProps = {
    variant?: "v1" | "v2" | "v3";
};

export function UserSidebar({ variant = "v1" }: UserSidebarProps) {
    const showMetaLeft = variant !== "v2";
    const dotIsInline = variant === "v2";
    return (
        <div className="sidebar-user">
            <div className="wrap">
                <div className="user-image">
                    <div className="image">
      
                        <ImageSwitch
                            light="/assets/images/photo-light.jpg"
                            dark="/assets/images/photo-dark.jpg"
                            width={468}
                            height={856}
                            alt="Saquib Ali"
                        />
                    </div>
              
                    {showMetaLeft && (
                        <div className="meta-left d-none d-sm-block">
                            <div className="bg-item-svg">
                                <ImageSwitch
                                    light="/assets/images/item/vector-user.svg"
                                    dark="/assets/images/item/vector-user_dark.svg"
                                    width={32}
                                    height={227}
                                />
                            </div>
                            <p className="avaiable-dot vertical text-body-3 text-black-72 fw-medium">
                                <span className="text-vertical">
                                    Available for Work
                                </span>
                                <span className="dot" />
                            </p>
                        </div>
                    )}
                </div>
                <div className="user-logo d-none d-lg-block">
                    <Logo width={40} height={40} />
                </div>
                <ul className="tf-social-icon-2 user-social d-grid">
                    {profile.socials.map((s) => (
                        <li key={s.label}>
                            <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                                {s.icon === "icon-github" ? (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        style={{ display: "inline-block", verticalAlign: "middle" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.72">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </g>
                                    </svg>
                                ) : s.icon === "icon-google" ? (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        style={{ display: "inline-block", verticalAlign: "middle" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.72">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.3-4.74 3.3-8.09z"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </g>
                                    </svg>
                                ) : (
                                    <i className={`icon ${s.icon}`} />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="user-info">
                    <p
                        className={
                            dotIsInline
                                ? "avaiable-dot text-body-3 text-white-72 fw-medium"
                                : "avaiable-dot text-body-3 fw-medium d-sm-none"
                        }
                    >
                        <span className="dot" />
                        <span>Available for Work</span>
                    </p>
                    <div className="user-text-glass">
                        <h5 className="greeting letter-space--2 text-white animationtext clip">
                            Hey, I’m{" "}
                            <span className="cd-words-wrapper">
                                {profile.rotatingNames.map((name, i) => (
                                    <span
                                        key={name}
                                        className={`item-text ${i === 0 ? "is-visible" : "is-hidden"}`}
                                    >
                                        {name}
                                    </span>
                                ))}
                            </span>
                        </h5>
                        <p className="introduce text-white-56 letter-space--05 text-body-3">
                            {profile.introBio}
                        </p>
                    </div>
                    <div className="br-line" />
                    <div className="action-group">
                        <a href="#contact" className="tf-btn-action">
                            <span className="ic-wrap">
                                <i className="icon icon-arrow-right-top" />
                            </span>
                            <span className="text text-body-3 letter-space--05 fw-medium">
                                Let’s talk
                            </span>
                            <span className="ic-wrap">
                                <i className="icon icon-arrow-right-top" />
                            </span>
                        </a>
                        <a
                            href="/assets/resume/Saquib_Ali_Resume.pdf"
                            className="action-down"
                            download="Saquib_Ali_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download Saquib Ali's Resume"
                        >
                            <i className="icon icon-download" aria-hidden="true" />
                            <span className="text-body-3">Download Resume</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
