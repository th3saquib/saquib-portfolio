"use client";

import { useState } from "react";
import Image from "next/image";

interface TechLogoItem {
    name: string;
    category: "frontend" | "backend" | "automation" | "tools" | "devops";
    color: string; // Brand color for hover glow
    icon: string; // Cached SVG filename
}

export function TechLogos() {
    const [activeFilter, setActiveFilter] = useState<"all" | "frontend" | "backend" | "automation" | "devops" | "tools">("all");

    const techItems: TechLogoItem[] = [
        // Frontend
        {
            name: "React",
            category: "frontend",
            color: "rgba(0, 216, 255, 0.15)",
            icon: "react.svg"
        },
        {
            name: "Next.js",
            category: "frontend",
            color: "rgba(255, 255, 255, 0.15)",
            icon: "nextjs.svg"
        },
        {
            name: "JavaScript",
            category: "frontend",
            color: "rgba(247, 223, 30, 0.15)",
            icon: "javascript.svg"
        },
        {
            name: "TypeScript",
            category: "frontend",
            color: "rgba(49, 120, 198, 0.15)",
            icon: "typescript.svg"
        },
        {
            name: "Tailwind CSS",
            category: "frontend",
            color: "rgba(56, 189, 248, 0.15)",
            icon: "tailwindcss.svg"
        },
        {
            name: "Bootstrap",
            category: "frontend",
            color: "rgba(119, 18, 246, 0.15)",
            icon: "bootstrap.svg"
        },
        
        // Backend
        {
            name: "WordPress",
            category: "backend",
            color: "rgba(33, 117, 155, 0.15)",
            icon: "wordpress.svg"
        },
        {
            name: "PHP",
            category: "backend",
            color: "rgba(119, 123, 179, 0.15)",
            icon: "php.svg"
        },
        {
            name: "MySQL",
            category: "backend",
            color: "rgba(0, 117, 143, 0.15)",
            icon: "mysql.svg"
        },
        
        // AI & Automation
        {
            name: "n8n Automation",
            category: "automation",
            color: "rgba(255, 110, 96, 0.15)",
            icon: "n8n.svg"
        },
        {
            name: "Claude AI",
            category: "automation",
            color: "rgba(217, 119, 6, 0.15)",
            icon: "claude.svg"
        },
        {
            name: "OpenAI API",
            category: "automation",
            color: "rgba(16, 163, 127, 0.15)",
            icon: "openai.svg"
        },

        // DevOps & Servers
        {
            name: "Google Cloud",
            category: "devops",
            color: "rgba(66, 133, 244, 0.15)",
            icon: "google-cloud.svg"
        },
        {
            name: "New Relic",
            category: "devops",
            color: "rgba(28, 231, 131, 0.15)",
            icon: "newrelic.svg"
        },
        {
            name: "Linux Servers",
            category: "devops",
            color: "rgba(255, 211, 61, 0.15)",
            icon: "linux.svg"
        },
        {
            name: "CloudPanel",
            category: "devops",
            color: "rgba(37, 99, 235, 0.15)",
            icon: "cloudpanel.svg"
        },
        {
            name: "Git",
            category: "devops",
            color: "rgba(240, 80, 51, 0.15)",
            icon: "git.svg"
        },

        // Design & UI
        {
            name: "Figma",
            category: "tools",
            color: "rgba(242, 78, 30, 0.15)",
            icon: "figma.svg"
        },
        {
            name: "Adobe Creative Suite",
            category: "tools",
            color: "rgba(255, 34, 0, 0.15)",
            icon: "adobe.svg"
        },
        {
            name: "GSAP Animation",
            category: "tools",
            color: "rgba(136, 206, 0, 0.15)",
            icon: "gsap.svg"
        }
    ];

    const categories = [
        { id: "all", label: "All Stack" },
        { id: "frontend", label: "Frontend" },
        { id: "backend", label: "Backend & CMS" },
        { id: "automation", label: "AI & Automation" },
        { id: "devops", label: "DevOps & Servers" },
        { id: "tools", label: "Design & Tools" }
    ] as const;

    const filteredItems = activeFilter === "all" 
        ? techItems 
        : techItems.filter(item => item.category === activeFilter);

    return (
        <div id="tech-logos" className="section-tech-logos flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-tech-stack" />
                Technologies
            </div>

            <div className="heading overflow-hidden" style={{ marginBottom: "24px" }}>
                <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                    My Core Tech Stack <br className="d-none d-lg-block" />
                    & Toolkit
                </h4>
                <p className="text text-black-56 text-body-2" style={{ maxWidth: "480px", marginTop: "12px" }}>
                    Expertise in building responsive frontend apps, custom CMS templates, DevOps hosting, and AI-driven automated workflows.
                </p>
            </div>

            {/* Category Filter Menu */}
            <div className="tech-filter-menu" style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "32px",
                borderBottom: "1px solid var(--black-8)",
                paddingBottom: "16px"
            }}>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        style={{
                            background: activeFilter === cat.id ? "var(--black-4)" : "transparent",
                            border: activeFilter === cat.id ? "1px solid var(--black-8)" : "1px solid transparent",
                            color: activeFilter === cat.id ? "var(--black-72)" : "var(--black-40)",
                            padding: "8px 16px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        onClick={() => setActiveFilter(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Logos Grid */}
            <div className="row g-4 tech-grid">
                {filteredItems.map((item, index) => (
                    <div className="col-6 col-sm-4 col-md-3" key={item.name + index}>
                        <div 
                            className="tech-logo-card" 
                            style={{
                                "--hover-glow": item.color,
                                background: "var(--black-4)",
                                border: "1px solid var(--black-8)",
                                borderRadius: "16px",
                                padding: "24px 16px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "16px",
                                height: "140px",
                                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                                cursor: "default"
                            } as React.CSSProperties}
                        >
                            <div className="tech-logo-icon" style={{
                                transition: "transform 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "48px",
                                height: "48px",
                                position: "relative"
                            }}>
                                <Image
                                    src={`/assets/images/icons/${item.icon}`}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <span style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "var(--black-72)",
                                transition: "color 0.2s"
                            }} className="tech-logo-name">
                                {item.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Local Styles for Hover Glow Effects */}
            <style jsx>{`
                .tech-logo-card:hover {
                    transform: translateY(-5px);
                    background: var(--black-6);
                    border-color: var(--hover-glow) !important;
                    box-shadow: 0 10px 25px var(--hover-glow);
                }
                .tech-logo-card:hover .tech-logo-icon {
                    transform: scale(1.1);
                }
                .tech-logo-card:hover .tech-logo-name {
                    color: var(--black-72);
                }
            `}</style>
        </div>
    );
}
