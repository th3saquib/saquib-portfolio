"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { works, graphicDesigns } from "@/data/works";

interface BehanceProject {
    id: string;
    title: string;
    link: string;
    publishedDate: string;
    thumbnail: string;
    image: string;
    category: string;
}

export function Work() {
    const [activeTab, setActiveTab] = useState<"websites" | "design">("websites");
    const [behanceProjects, setBehanceProjects] = useState<BehanceProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    // Lightbox State
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [loadingProjectImages, setLoadingProjectImages] = useState(false);
    const [projectImages, setProjectImages] = useState<string[]>([]);

    // Use fetched Behance projects or fall back to local design array
    const resolvedDesigns = useMemo(() => {
        return behanceProjects.length > 0 
            ? behanceProjects 
            : graphicDesigns.map((d, index) => ({
                id: `local-${index}`,
                title: d.title,
                link: d.link || "https://www.behance.net/saquibali1",
                publishedDate: "",
                thumbnail: d.image,
                image: d.image,
                category: d.category
            }));
    }, [behanceProjects]);

    useEffect(() => {
        if (activeTab === "design" && behanceProjects.length === 0) {
            setLoading(true);
            fetch("/api/behance")
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
                        setBehanceProjects(data.projects);
                    } else {
                        setError(true);
                    }
                })
                .catch((err) => {
                    console.error("Error loading Behance projects:", err);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [activeTab, behanceProjects.length]);

    // Handle lightbox keyboard navigation and escape
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight") {
                setLightboxIndex((prev) => 
                    prev !== null ? (prev + 1) % resolvedDesigns.length : null
                );
            }
            if (e.key === "ArrowLeft") {
                setLightboxIndex((prev) => 
                    prev !== null ? (prev - 1 + resolvedDesigns.length) % resolvedDesigns.length : null
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, resolvedDesigns]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [lightboxIndex]);

    // Fetch images inside Behance project when selected
    useEffect(() => {
        if (lightboxIndex === null) {
            setProjectImages([]);
            setLoadingProjectImages(false);
            return;
        }

        // Scroll the lightbox modal container to the top
        const modalContainer = document.getElementById("lightbox-modal");
        if (modalContainer) {
            modalContainer.scrollTop = 0;
        }

        const project = resolvedDesigns[lightboxIndex];
        if (!project) return;

        // If it's a fallback or not a standard Behance gallery project, use the cover image
        if (!project.link || !project.link.includes("/gallery/")) {
            setProjectImages([project.image]);
            setLoadingProjectImages(false);
            return;
        }

        setLoadingProjectImages(true);
        setProjectImages([]);

        fetch(`/api/behance/project?url=${encodeURIComponent(project.link)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.images) && data.images.length > 0) {
                    setProjectImages(data.images);
                } else {
                    setProjectImages([project.image]);
                }
            })
            .catch((err) => {
                console.error("Error loading Behance project detail images:", err);
                setProjectImages([project.image]);
            })
            .finally(() => {
                setLoadingProjectImages(false);
            });
    }, [lightboxIndex, resolvedDesigns]);

    return (
        <div id="work" className="section-work flat-spacing">
            <div className="sect-tag text-caption fw-medium">
                <i className="icon icon-high-light" />
                Work Highlights
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade" style={{ marginBottom: "32px" }}>
                Featured Projects & Design Work
            </h2>

            <div className="tab-menu-work">
                <button
                    type="button"
                    className={`tab-btn ${activeTab === "websites" ? "active" : ""}`}
                    onClick={() => setActiveTab("websites")}
                >
                    Websites
                </button>
                <button
                    type="button"
                    className={`tab-btn ${activeTab === "design" ? "active" : ""}`}
                    onClick={() => setActiveTab("design")}
                >
                    Graphic Design
                </button>
            </div>

            {activeTab === "websites" && (
                <div className="work-list element-sticky">
                    {works.map((w, i) => (
                        <div className="sticky-item" key={w.title}>
                            <div className="wg-work">
                                <div className="work-image browser-mockup">
                                    <div className="browser-header">
                                        <div className="browser-dots">
                                            <span className="b-dot b-red" />
                                            <span className="b-dot b-yellow" />
                                            <span className="b-dot b-green" />
                                        </div>
                                        <div className="browser-address">
                                            {w.url.replace("https://", "")}
                                        </div>
                                    </div>
                                    <div className="browser-body">
                                        <Image
                                            src={w.image}
                                            alt={w.title}
                                            className="work-screenshot"
                                            width={800}
                                            height={500}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="wrap">
                                    <div className="work-content">
                                        <div className="w-image" style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                                            {/* Transparent overlay card */}
                                        </div>
                                        <div className="content">
                                            <div className="content-top">
                                                <div className="w-logo">
                                                    <Image
                                                        loading="lazy"
                                                        width={40}
                                                        height={40}
                                                        src={w.logo}
                                                        alt={`${w.title} logo`}
                                                    />
                                                </div>
                                                <h4 className="w-title letter-space--2 text-white-72">
                                                    {w.title}
                                                </h4>
                                                <p className="w-desc text-white-56 text-body-3">
                                                    {w.description}
                                                </p>
                                                <div className="w-highlight">
                                                    <div className="box-high">
                                                        <p className="text-body-3 text-white-56">
                                                            Year
                                                        </p>
                                                        <p className="text-body-1 text-white-72">
                                                            {w.year}
                                                        </p>
                                                    </div>
                                                    <div className="box-high">
                                                        <p className="text-body-3 text-white-56">
                                                            Role
                                                        </p>
                                                        <p className="text-body-1 text-white-72">
                                                            {w.role}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-tag-list">
                                                    {w.tags.map((tag) => (
                                                        <div
                                                            className="tag"
                                                            key={tag}
                                                        >
                                                            <span className="text-body-3 fw-medium text-white-72">
                                                                {tag}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="content-bottom">
                                                <div className="br-line" />
                                                <div className="group-action">
                                                    <a
                                                        href={w.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="tf-btn-action style-white"
                                                    >
                                                        <span className="ic-wrap">
                                                            <i className="icon icon-arrow-right-top" />
                                                        </span>
                                                        <span className="text text-body-3 letter-space--05 fw-medium">
                                                            Visit Live Site
                                                        </span>
                                                        <span className="ic-wrap">
                                                            <i className="icon icon-arrow-right-top" />
                                                        </span>
                                                    </a>
                                                    <p className="text-white-40">
                                                        <span className="text-white-72">
                                                            {String(i + 1).padStart(
                                                                2,
                                                                "0",
                                                            )}
                                                        </span>{" "}
                                                        /{" "}
                                                        {String(
                                                            works.length,
                                                        ).padStart(2, "0")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "design" && (
                <div className="design-gallery-wrapper">
                    {loading ? (
                        <div className="row g-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div className="col-md-6 col-lg-4" key={i}>
                                    <div className="design-card skeleton-card" style={{
                                        background: "var(--black-4)",
                                        border: "1px solid var(--black-8)",
                                        borderRadius: "16px",
                                        height: "280px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        padding: "16px"
                                    }}>
                                        <div className="skeleton-image" style={{
                                            background: "var(--black-6)",
                                            height: "75%",
                                            borderRadius: "12px",
                                            animation: "pulse 1.5s infinite ease-in-out"
                                        }} />
                                        <div className="skeleton-text" style={{
                                            background: "var(--black-6)",
                                            height: "15%",
                                            width: "60%",
                                            borderRadius: "4px",
                                            marginTop: "12px",
                                            animation: "pulse 1.5s infinite ease-in-out"
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="design-gallery row g-4">
                            {resolvedDesigns.map((d, index) => (
                                <div className="col-md-6 col-lg-4" key={d.id} onClick={() => setLightboxIndex(index)}>
                                    <div className="design-card hover-glow" style={{
                                        cursor: "pointer",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        background: "var(--black-4)",
                                        border: "1px solid var(--black-8)",
                                        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <div className="card-image-wrapper" style={{
                                            position: "relative",
                                            width: "100%",
                                            paddingTop: "75%", // 4:3 Aspect Ratio
                                            overflow: "hidden",
                                            background: "rgba(10,10,10,0.5)"
                                        }}>
                                            {d.thumbnail ? (
                                                <Image
                                                    src={d.thumbnail}
                                                    alt={d.title}
                                                    fill
                                                    unoptimized
                                                    style={{
                                                        objectFit: "cover",
                                                        transition: "transform 0.5s ease"
                                                    }}
                                                    className="gallery-thumb-img"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="card-placeholder-gradient" style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 100%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <span style={{ opacity: 0.5, fontSize: "14px" }}>{d.category}</span>
                                                </div>
                                            )}
                                            
                                            {/* Hover overlay indicator */}
                                            <div className="hover-overlay" style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                background: "rgba(0,0,0,0.4)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: 0,
                                                transition: "opacity 0.3s ease"
                                            }}>
                                                <span style={{
                                                    background: "rgba(255,255,255,0.15)",
                                                    padding: "8px 16px",
                                                    borderRadius: "30px",
                                                    fontSize: "12px",
                                                    color: "#fff",
                                                    fontWeight: 500,
                                                    backdropFilter: "blur(4px)",
                                                    border: "1px solid rgba(255,255,255,0.2)"
                                                }}>
                                                    View Showcase
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-info" style={{
                                            padding: "16px 20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "6px"
                                        }}>
                                            <span className="card-tag" style={{
                                                fontSize: "11px",
                                                textTransform: "uppercase",
                                                letterSpacing: "1.5px",
                                                color: "var(--color-primary, #0088ff)",
                                                fontWeight: 600
                                            }}>{d.category}</span>
                                            <h5 className="card-title text-black-72" style={{
                                                margin: 0,
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                lineHeight: 1.4
                                            }}>{d.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Custom Lightbox Type Modal */}
            {lightboxIndex !== null && (
                <div 
                    id="lightbox-modal"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(8, 8, 8, 0.95)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        zIndex: 99999,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        overflowY: "auto",
                        padding: "80px 0 40px 0"
                    }} 
                    onClick={() => setLightboxIndex(null)}
                >
                    
                    {/* Close Button */}
                    <button 
                        aria-label="Close project showcase"
                        style={{
                        position: "fixed",
                        top: "24px",
                        right: "24px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "24px",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100000,
                        transition: "background-color 0.2s"
                    }} onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(null);
                    }}>
                        &times;
                    </button>

                    {/* Navigation Buttons */}
                    <button 
                        aria-label="Previous project"
                        style={{
                        position: "fixed",
                        left: "24px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "20px",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100000,
                        transition: "background-color 0.2s"
                    }} onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) => 
                            prev !== null ? (prev - 1 + resolvedDesigns.length) % resolvedDesigns.length : null
                        );
                    }}>
                        &#10229;
                    </button>

                    <button 
                        aria-label="Next project"
                        style={{
                        position: "fixed",
                        right: "24px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "20px",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100000,
                        transition: "background-color 0.2s"
                    }} onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex((prev) => 
                            prev !== null ? (prev + 1) % resolvedDesigns.length : null
                        );
                    }}>
                        &#10230;
                    </button>

                    {/* Main Content Area */}
                    <div style={{
                        width: "90%",
                        maxWidth: "1000px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "24px",
                        animation: "fadeIn 0.3s ease-out"
                    }} onClick={(e) => e.stopPropagation()}>
                        
                        {/* Image List / Showcase */}
                        <div style={{
                            width: "100%",
                            borderRadius: "16px",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(0,0,0,0.2)",
                            overflow: "hidden"
                        }}>
                            {loadingProjectImages ? (
                                <div style={{ 
                                    display: "grid", 
                                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 450px), 1fr))", 
                                    gap: "24px", 
                                    padding: "24px", 
                                    width: "100%" 
                                }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} style={{
                                            width: "100%",
                                            height: "90vh",
                                            background: "rgba(255,255,255,0.02)",
                                            borderRadius: "12px",
                                            animation: "pulse 1.5s infinite ease-in-out"
                                        }} />
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    width: "100%",
                                    display: "grid",
                                    gridTemplateColumns: projectImages.length > 1 ? "repeat(auto-fit, minmax(min(100%, 450px), 1fr))" : "1fr",
                                    gap: "24px",
                                    padding: "24px"
                                }}>
                                    {projectImages.map((img, idx) => (
                                        <div key={idx} style={{
                                            width: "100%",
                                            height: "90vh",
                                            position: "relative",
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            background: "rgba(0,0,0,0.1)",
                                            border: "1px solid rgba(255,255,255,0.05)"
                                        }}>
                                            <Image
                                                src={img}
                                                alt={`${resolvedDesigns[lightboxIndex].title} - slide ${idx + 1}`}
                                                fill
                                                unoptimized
                                                style={{
                                                    objectFit: projectImages.length > 1 ? "cover" : "contain",
                                                    animation: "fadeIn 0.5s ease-out"
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Metadata & Actions */}
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "16px",
                            padding: "8px 8px 32px 8px"
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                <span style={{
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    color: "var(--color-primary, #0088ff)",
                                    fontWeight: 600
                                }}>
                                    {resolvedDesigns[lightboxIndex].category}
                                </span>
                                <h4 style={{
                                    margin: 0,
                                    fontSize: "22px",
                                    color: "#fff",
                                    fontWeight: 500,
                                    letterSpacing: "-0.5px"
                                }}>
                                    {resolvedDesigns[lightboxIndex].title}
                                </h4>
                            </div>

                            <a
                                href={resolvedDesigns[lightboxIndex].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tf-btn-action style-white"
                                style={{
                                    margin: 0,
                                    padding: "12px 24px",
                                    borderRadius: "30px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    textDecoration: "none"
                                }}
                            >
                                <span className="text text-body-3 letter-space--05 fw-medium">
                                    View Full Behance Project
                                </span>
                                <span className="ic-wrap">
                                    <i className="icon icon-arrow-right-top" />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Injected custom styles for animations and card hover */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
                .design-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 30px rgba(0, 136, 255, 0.08);
                    border-color: rgba(0, 136, 255, 0.25) !important;
                }
                .design-card:hover .gallery-thumb-img {
                    transform: scale(1.05);
                }
                .design-card:hover .hover-overlay {
                    opacity: 1 !important;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
