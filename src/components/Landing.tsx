"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSaquibAnimations } from "@/hooks/useSaquibAnimations";
import { Logo } from "./Logo";
import Image from "next/image";

type Demo = {
  href: string;
  thumb: string;
  title: string;
  subtitle?: string;
  darkHref?: string;
  lightHref?: string;
};

const demos: Demo[] = [
  {
    href: "/",
    darkHref: "/",
    lightHref: "/light",
    thumb: "/assets/images/landing/demo/demo-v1.jpg",
    title: "Home",
    subtitle: "(Version Intro 1)",
  },
  {
    href: "/v2",
    darkHref: "/v2",
    lightHref: "/v2-light",
    thumb: "/assets/images/landing/demo/demo-v2.jpg",
    title: "Home V2",
    subtitle: "(Version Intro 2)",
  },
  {
    href: "/v3",
    darkHref: "/v3",
    lightHref: "/v3-light",
    thumb: "/assets/images/landing/demo/demo-v3.jpg",
    title: "Home V3",
    subtitle: "(Version Intro 3)",
  },
  { href: "/bg-item", thumb: "/assets/images/landing/themes/theme-3.jpg", title: "Background Image" },
  { href: "/bg-video", thumb: "/assets/images/landing/themes/theme-4.jpg", title: "Background Video 1" },
  { href: "/bg-video-v2", thumb: "/assets/images/landing/themes/theme-5.jpg", title: "Background Video 2" },
];

export function Landing() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
    document.body.classList.add("counter-scroll", "video-v1");
    return () => document.body.classList.remove("counter-scroll", "video-v1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useSaquibAnimations();

  return (
    <>
      <div className="body-background bg-dark">
        <div className="bg-video video-dark">
          <video className="video" muted autoPlay loop playsInline>
            <source src="/assets/images/overlay-3.mp4" type="video/mp4" />
          </video>
          <div className="overlay-1" />
        </div>
      </div>

      <main id="wrapper">
        <div className="main-landing">
          <div className="container">
            <div className="hero-top">
              <div className="landing-header">
                <Link href="/" className="logo-site">
                  <Logo width={40} height={40} />
                </Link>
                <a href="#" className="tf-btn-action">
                  <span className="ic-wrap">
                    <i className="icon icon-arrow-right-top" />
                  </span>
                  <span className="text text-body-3 letter-space--05 fw-medium">Let’s talk</span>
                  <span className="ic-wrap">
                    <i className="icon icon-arrow-right-top" />
                  </span>
                </a>
              </div>
              <div className="landing-title text-center">
                <h1 className="intro-title  text-white mb-24">
                  <span>Saquib Ali</span>
                  Resume & Personal Portfolio <br className="d-none d-md-block" />
                  One Page <span className="type-2">Next.js</span> Website
                </h1>
                <p className="text-body-1 split-text split-lines-transform text-white-56">
                  All-in-one platform to automate tasks, manage teams, and scale faster.
                </p>
              </div>
            </div>
            <div className="list-demo">
              <div className="landing-demo tf-grid-layout sm-col-2 lg-col-3">
                {demos.map((d) => (
                  <div className="demo-box" key={d.href}>
                    <div className="thumbs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <Image src={d.thumb} width={572} height={358} alt={d.title} />
                      <div className="action-demo">
                        {d.darkHref && d.lightHref ? (
                          <>
                            <Link href={d.darkHref} target="_blank" className="tf-btn animate-btn animate-dark">
                              <span className="text-body-3">Demo Dark</span>
                            </Link>
                            <Link href={d.lightHref} target="_blank" className="tf-btn animate-btn animate-dark">
                              <span className="text-body-3">Demo Light</span>
                            </Link>
                          </>
                        ) : (
                          <Link href={d.href} target="_blank" className="tf-btn animate-btn animate-dark">
                            <span className="text-body-3">View Demo</span>
                          </Link>
                        )}
                      </div>
                      <Link href={d.href} className="overlay-link" />
                    </div>
                    <div className="title">
                      <Link
                        href={d.href}
                        target="_blank"
                        className="link text-white-72 text-body-1 letter-space--1"
                      >
                        {d.title}
                        {d.subtitle && <span className="text-primary text-body-3"> {d.subtitle}</span>}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="landing-footer flat-spacing-3">
              <div className="content text-center">
                <h1 className="intro-title  text-white mb-24">
                  <span>Saquib Ali</span>
                  Resume & Personal Portfolio <br />
                  One Page <span className="type-2">Next.js</span> Website
                </h1>
                <a href="#" className="tf-btn-action">
                  <span className="ic-wrap">
                    <i className="icon icon-arrow-right-top" />
                  </span>
                  <span className="text text-body-3 letter-space--05 fw-medium">Purchase Now</span>
                  <span className="ic-wrap">
                    <i className="icon icon-arrow-right-top" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
