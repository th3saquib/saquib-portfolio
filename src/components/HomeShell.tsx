"use client";

import { useEffect } from "react";
import { BodyBackground } from "./BodyBackground";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { Intro } from "./sections/Intro";
import { IntroV2 } from "./sections/IntroV2";
import { IntroV3 } from "./sections/IntroV3";
import { About } from "./sections/About";
import { AboutV2 } from "./sections/AboutV2";
import { Education } from "./sections/Education";
import { Work } from "./sections/Work";
import { Services } from "./sections/Services";
import { Tech } from "./sections/Tech";
import { TechLogos } from "./sections/TechLogos";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { useSaquibAnimations } from "@/hooks/useSaquibAnimations";
import { useClock } from "@/hooks/useClock";
import { useHeadlineRotate } from "@/hooks/useHeadlineRotate";
import { useInfiniteSlide } from "@/hooks/useInfiniteSlide";
import { useBodyThemeClass } from "@/hooks/useBodyThemeClass";

export type HomeShellProps = {
    defaultMode?: "dark" | "light";
    showCloudBg?: boolean;
    showVideoBg?: boolean;
    videoSrc?: string;
    bodyClass?: string;
    variant?: "v1" | "v2" | "v3";
    introVariant?: "v1" | "v2" | "v3";
    aboutVariant?: "v1" | "v2";
    preloaderDark?: boolean;
};

export function HomeShell({
    defaultMode = "dark",
    showCloudBg = true,
    showVideoBg = true,
    videoSrc = "/assets/images/overlay-3.mp4",
    bodyClass = "counter-scroll",
    variant = "v1",
    introVariant,
    aboutVariant,
    preloaderDark,
}: HomeShellProps) {
    const videoEnabled = showVideoBg;
    const selectedVideo = videoSrc;

    useBodyThemeClass({ defaultMode });

    useEffect(() => {
        const body = document.body;
        const classes = bodyClass.split(" ").filter(Boolean);

        classes.forEach((c) => body.classList.add(c));

        return () => {
            classes.forEach((c) => body.classList.remove(c));
        };
    }, [bodyClass]);

    useEffect(() => {
        const body = document.body;
        if (videoEnabled) {
            body.classList.add("video-v1");
        } else {
            body.classList.remove("video-v1");
        }
    }, [videoEnabled]);

    useClock();
    useInfiniteSlide();
    useHeadlineRotate();
    useSaquibAnimations();

    const introResolved = introVariant ?? variant;

    const aboutResolved =
        aboutVariant ?? (variant === "v2" ? "v2" : "v1");

    const IntroComponent =
        introResolved === "v2"
            ? IntroV2
            : introResolved === "v3"
              ? IntroV3
              : Intro;

    const AboutComponent = aboutResolved === "v2" ? AboutV2 : About;

    const headerOutsideMain = variant === "v2";
    const showMobileMenu = variant !== "v2";
    const sidebarPositionClass = variant === "v2" ? "pst-v2" : "pst-v1";

    const preloadIsDark = preloaderDark ?? defaultMode === "dark";

    return (
        <>
            <Preloader bgDark={preloadIsDark} />

            <BodyBackground
                showCloudItem={showCloudBg}
                showVideo={videoEnabled}
                videoSrc={selectedVideo}
            />

            {showMobileMenu && <MobileMenu />}

            {headerOutsideMain && <HeaderClock variant={variant} />}

            <DesktopSidebar positionClass={sidebarPositionClass} />

            <main id="wrapper">
                {!headerOutsideMain && <HeaderClock variant={variant} />}

                <UserSidebar variant={variant} />

                <div className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8 ms-auto">
                                <div className="wrap-container">
                                    <IntroComponent />
                                    <AboutComponent />
                                    <Education />
                                    <Work />
                                    <Services />
                                    <Tech />
                                    <TechLogos />
                                    <Contact />
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}