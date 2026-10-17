"use client";

import { useEffect } from "react";
import { BodyBackground } from "./BodyBackground";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { Intro } from "./sections/Intro";
import { About } from "./sections/About";
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
    preloaderDark?: boolean;
};

export function HomeShell({
    defaultMode = "dark",
    showCloudBg = true,
    showVideoBg = true,
    videoSrc = "/assets/images/overlay-3.mp4",
    bodyClass = "counter-scroll",
    preloaderDark,
}: HomeShellProps = {}) {
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
        if (showVideoBg) {
            body.classList.add("video-v1");
        } else {
            body.classList.remove("video-v1");
        }
    }, [showVideoBg]);

    useClock();
    useInfiniteSlide();
    useHeadlineRotate();
    useSaquibAnimations();

    const preloadIsDark = preloaderDark ?? defaultMode === "dark";

    return (
        <>
            <Preloader bgDark={preloadIsDark} />

            <BodyBackground
                showCloudItem={showCloudBg}
                showVideo={showVideoBg}
                videoSrc={videoSrc}
            />

            <MobileMenu />

            <DesktopSidebar positionClass="pst-v1" />

            <main id="wrapper">
                <HeaderClock variant="v1" />

                <UserSidebar variant="v1" />

                <div className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8 ms-auto">
                                <div className="wrap-container">
                                    <Intro />
                                    <About />
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