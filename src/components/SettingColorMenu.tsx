"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { colorSwatches } from "@/data/colors";

const STORAGE_KEY = "saquib-color-variant";
const DEFAULT_BODY_CLASS = "body-default";

type SettingColorMenuProps = {
    leftBarClass?: string;
    videoEnabled?: boolean;
    setVideoEnabled?: (val: boolean) => void;
    selectedVideo?: string;
    setSelectedVideo?: (val: string) => void;
};

export function SettingColorMenu({
    leftBarClass = "",
    videoEnabled = false,
    setVideoEnabled,
    selectedVideo = "/assets/images/overlay-2.mp4",
    setSelectedVideo,
}: SettingColorMenuProps = {}) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string | null>(null);
    const { setTheme } = useTheme();

    const applyBodyClass = (cls: string | null) => {
        const body = document.body;

        body.classList.forEach((c) => {
            if (
                c === DEFAULT_BODY_CLASS ||
                c.startsWith("body-v") ||
                c.startsWith("dark-v")
            ) {
                body.classList.remove(c);
            }
        });

        body.classList.add(cls || DEFAULT_BODY_CLASS);
    };

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            setActive(saved);
            applyBodyClass(saved);
        } else {
            setActive(null);
            applyBodyClass(null);
        }
    }, []);

    const handleChoose = (bodyClass: string) => {
        const swatch = colorSwatches.find(
            (item) => item.bodyClass === bodyClass
        );

        if (!swatch) return;

        setTheme(swatch.mode);
        setActive(swatch.bodyClass);
        applyBodyClass(swatch.bodyClass);
        localStorage.setItem(STORAGE_KEY, swatch.bodyClass);
    };

    return (
        <>
            <div
                className={`tf-left-bar${leftBarClass ? " " + leftBarClass : ""}`}
            >
                <button
                    type="button"
                    className="btn-setting-color tf-btn-icon style-2"
                    onClick={() => setOpen(true)}
                    aria-label="Open color settings"
                >
                    <i className="icon-gear" />
                </button>
            </div>

            <div
                className={`offcanvas offcanvas-end offcanvas-color${open ? " show" : ""}`}
                id="settingColorMenu"
                style={{
                    visibility: open ? "visible" : "hidden",
                    transform: open ? "none" : undefined,
                }}
            >
                <div className="offcanvas-content">
                    <div className="canvas-header">
                        <h5 className="letter-space--2">Configuration</h5>
                        <span
                            className="icon-close-popup"
                            onClick={() => setOpen(false)}
                            role="button"
                            tabIndex={0}
                        >
                            <i className="icon-close" />
                        </span>
                    </div>

                    <div className="canvas-body">
                        <h6 className="title">Color</h6>
                        <div className="settings-color list-choose">
                            {colorSwatches.map((swatch) => (
                                <button
                                    key={swatch.bodyClass}
                                    type="button"
                                    className={`btn-color theme-${swatch.mode} choose-item${
                                        active === swatch.bodyClass
                                            ? " active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleChoose(swatch.bodyClass)
                                    }
                                >
                                    <span
                                        className={`color ${swatch.className}`}
                                    />
                                    <span className="text">{swatch.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Video Background Settings */}
                        <div style={{ marginTop: "32px" }}>
                            <h6 className="title" style={{ marginBottom: "16px" }}>Video Background</h6>
                            
                            {/* Toggle Switch */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "12px",
                                marginBottom: "20px",
                                padding: "12px 16px",
                                background: "var(--black-4)",
                                borderRadius: "12px",
                                border: "1px solid var(--black-8)"
                            }}>
                                <span style={{ color: "var(--black-72)", fontSize: "14px", fontWeight: 500 }}>Enable Video Background</span>
                                <div style={{ marginLeft: "auto" }}>
                                    <label className="switch" style={{
                                        position: "relative",
                                        display: "inline-block",
                                        width: "46px",
                                        height: "24px",
                                        margin: 0
                                    }}>
                                        <input 
                                            type="checkbox" 
                                            checked={videoEnabled}
                                            onChange={(e) => {
                                                const val = e.target.checked;
                                                setVideoEnabled?.(val);
                                                localStorage.setItem("saquib-video-enabled", String(val));
                                            }}
                                            style={{ opacity: 0, width: 0, height: 0 }}
                                        />
                                        <span style={{
                                            position: "absolute",
                                            cursor: "pointer",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: videoEnabled ? "var(--primary)" : "var(--black-16)",
                                            transition: ".3s",
                                            borderRadius: "24px"
                                        }}>
                                            <span style={{
                                                position: "absolute",
                                                content: "''",
                                                height: "18px",
                                                width: "18px",
                                                left: videoEnabled ? "24px" : "3px",
                                                bottom: "3px",
                                                backgroundColor: "white",
                                                transition: ".3s",
                                                borderRadius: "50%"
                                            }} />
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Video Selector - only visible when enabled */}
                            {videoEnabled && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <span style={{ color: "var(--black-40)", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Select Video Source</span>
                                    <div style={{ display: "grid", gap: "10px" }}>
                                        {[
                                            { path: "/assets/images/overlay.mp4", label: "Video Background 1" },
                                            { path: "/assets/images/overlay-2.mp4", label: "Video Background 2" },
                                            { path: "/assets/images/overlay-3.mp4", label: "Video Background 3" }
                                        ].map((vid) => (
                                            <button
                                                key={vid.path}
                                                type="button"
                                                className={`choose-item${selectedVideo === vid.path ? " active" : ""}`}
                                                style={{
                                                    background: selectedVideo === vid.path ? "var(--black-6)" : "transparent",
                                                    border: selectedVideo === vid.path ? "1px solid var(--black-16)" : "1px solid var(--black-4)",
                                                    padding: "10px 14px",
                                                    borderRadius: "10px",
                                                    cursor: "pointer",
                                                    textAlign: "left",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    width: "100%",
                                                    transition: "all 0.2s"
                                                }}
                                                onClick={() => {
                                                    setSelectedVideo?.(vid.path);
                                                    localStorage.setItem("saquib-video-src", vid.path);
                                                }}
                                            >
                                                <div style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%",
                                                    background: selectedVideo === vid.path ? "var(--primary)" : "var(--black-8)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "9px"
                                                }}>
                                                    <span style={{ color: selectedVideo === vid.path ? "#fff" : "var(--black-56)", marginLeft: selectedVideo === vid.path ? "2px" : "0" }}>▶</span>
                                                </div>
                                                <span style={{ color: selectedVideo === vid.path ? "var(--black-72)" : "var(--black-56)", fontSize: "13px", fontWeight: 500 }}>
                                                    {vid.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {open && (
                <div
                    className="offcanvas-backdrop fade show"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
