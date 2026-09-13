"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { awards, Award } from "@/data/awards";

export function About() {
  const [selectedCert, setSelectedCert] = useState<Award | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  // Lock body scroll when certificate modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedCert]);

  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle" />
        About
      </div>
      <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        Building fast, secure <br className="d-none d-lg-block" />
        websites and smart <br className="d-none d-lg-block" />
        workflow automations
      </h2>
      <p className="s-desc text-black-56 scrolling-effect effectTop">
        I combine web development, server management, and intelligent API integrations to build
        <br className="d-none d-lg-block" /> high-performance, search-friendly websites and workflow automations. <br />
        <br />
        With a background in graphic design and UI/UX, I bring a design-first approach to code, <br className="d-none d-lg-block" />
        ensuring every site is not only fast and secure, but also pixel-accurate and highly usable.
      </p>
      <ul className="award-list">
        {awards.map((a) => (
          <li className="award-item hover-cursor-img" key={a.name + a.year}>
            <a 
              href={a.url} 
              onClick={(e) => {
                e.preventDefault();
                setSelectedCert(a);
              }}
            >
              <div className="left">
                <h6 className="award_name letter-space--2 text-black-72">{a.name}</h6>
                <p className="award_desc text-black-56">{a.publisher}</p>
              </div>
              <h6 className="award_year text-black-72">{a.year}</h6>
              <div className="award_img hover-image">
                <Image loading="lazy" width={158} height={224} src={a.image} alt={a.name} />
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Premium Glassmorphism Certificate Modal */}
      {selectedCert && (
        <div
          className="cert-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(6, 6, 6, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          onClick={() => setSelectedCert(null)}
        >
          {/* Modal Container */}
          <div
            className="cert-modal-content"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "680px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
              color: "#fff",
              animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              aria-label="Close certificate modal"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                fontSize: "20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onClick={() => setSelectedCert(null)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              &times;
            </button>

            {/* Cert Title & Publisher */}
            <div style={{ textAlign: "center", width: "100%", padding: "0 30px" }}>
              <h5 style={{ margin: "0 0 6px 0", color: "#fff", fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.5px" }}>{selectedCert.name}</h5>
              <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.5)", fontSize: "0.875rem" }}>{selectedCert.publisher} &bull; {selectedCert.year}</p>
            </div>

            {/* Certificate Image */}
            <div
              style={{
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                background: "rgba(0,0,0,0.2)"
              }}
            >
              <Image
                src={selectedCert.image}
                alt={selectedCert.name}
                width={600}
                height={850}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  maxHeight: "55vh",
                  objectFit: "contain"
                }}
              />
            </div>

            {/* Verify Button */}
            <a
              href={selectedCert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tf-btn-action style-white"
              style={{
                width: "100%",
                justifyContent: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "999px",
                backgroundColor: "#ffffff",
                color: "#000000",
                textDecoration: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                transition: "all 0.25s ease",
                border: "1px solid #ffffff"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
            >
              <span className="text" style={{ fontSize: "14px" }}>Verify Certificate</span>
              <span className="ic-wrap" style={{ display: "inline-flex", alignItems: "center" }}>
                <i className="icon icon-arrow-right-top" style={{ fontSize: "14px" }} />
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Embedded style elements for keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

