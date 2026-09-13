"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/profile";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setError(null);
    setSubmitted(false);

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send" />
        Contact
      </div>
      <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        If you have a general or project <br className="d-none d-lg-block" />
        enquiry, please drop me an email <br className="d-none d-lg-block" />
        or fill the form - available now
      </h2>
      
      <form className="form-contact" id="contactform" onSubmit={handleSubmit} noValidate>
        {submitted && (
          <div className="status-alert-clean success" style={{ marginBottom: 24 }}>
            <span className="alert-bullet"></span>
            <span className="alert-msg">Thanks for reaching out! Your message was sent successfully.</span>
          </div>
        )}
        
        {error && (
          <div className="status-alert-clean error" style={{ marginBottom: 24 }}>
            <span className="alert-bullet"></span>
            <span className="alert-msg">{error}</span>
          </div>
        )}
        
        <div className="form-content effectFade fadeUp no-div">
          <fieldset className="field-ip">
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Your Name *" 
              aria-label="Your Name"
              required 
              disabled={loading} 
            />
          </fieldset>
          <fieldset className="field-ip">
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email Address *" 
              aria-label="Email Address"
              required 
              disabled={loading} 
            />
          </fieldset>
          <fieldset className="field-ip">
            <textarea 
              name="message" 
              id="message" 
              placeholder="Project Description" 
              aria-label="Project Description"
              disabled={loading} 
            />
          </fieldset>
        </div>
        
        <div className="form-action effectFade fadeUp no-div">
          <div className="send-wrap">
            <button type="submit" className="tf-btn animate-btn animate-dark" disabled={loading}>
              {loading ? (
                <span className="text-body-3 btn-loading-text">
                  <span className="spinner-clean inline-spinner"></span>
                  Sending...
                </span>
              ) : (
                <span className="text-body-3">Send Message</span>
              )}
            </button>
          </div>
          
          <div className="direct-contact-links">
            <a href={`mailto:${profile.email}`} className="direct-contact-item mail-item">
              <span className="icon-wrapper-mini">
                <Image 
                  src="/assets/images/icons/gmail.svg" 
                  alt="Gmail" 
                  width={20} 
                  height={20}
                />
              </span>
              <span className="text-val">{profile.email}</span>
            </a>
            
            {profile.phone && (
              <a 
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="direct-contact-item whatsapp-item"
              >
                <span className="icon-wrapper-mini">
                  <Image 
                    src="/assets/images/icons/whatsapp.svg" 
                    alt="WhatsApp" 
                    width={20} 
                    height={20}
                  />
                </span>
                <span className="text-val">{profile.phone}</span>
              </a>
            )}
          </div>
        </div>

        <div className="social-connect-block-inline effectFade fadeUp no-div">
          <span className="social-connect-title-inline">Follow Me / Social Profiles</span>
          <div className="social-connect-row-inline">
            {profile.socials.map((s) => {
              let iconSrc = "/assets/images/icons/google.svg";
              if (s.icon.includes("linkin")) {
                iconSrc = "/assets/images/icons/linkedin.svg";
              } else if (s.icon.includes("github")) {
                iconSrc = "/assets/images/icons/github.svg";
              } else if (s.icon.includes("google")) {
                iconSrc = "/assets/images/icons/google.svg";
              }

              return (
                <a 
                  key={s.label}
                  href={s.href} 
                  aria-label={s.label} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-connect-btn-inline"
                >
                  <Image 
                    src={iconSrc} 
                    alt={s.label} 
                    width={20} 
                    height={20}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}
