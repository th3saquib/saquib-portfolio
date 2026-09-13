"use client";

import { useState, useEffect, Fragment } from "react";
import { navItems } from "@/data/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="action-open-mobile d-lg-none">
        <button 
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="tf-btn-icon style-2" 
          onClick={toggle}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        >
          <div className={`btn-mobile-menu${open ? " close" : ""}`}>
            <span />
          </div>
        </button>
        <div className={`nav-mobile-list${open ? " open" : ""}`}>
          <ul className="nav-mobile-item">
            {navItems.map((item, i) => (
              <Fragment key={item.href + i}>
                <li className="nav-item">
                  <a href={item.href} className="item-link scroll-link" onClick={() => setOpen(false)}>
                    <i className={`icon ${item.icon}`} />
                    <p className="tool-tip text-caption">{item.label}</p>
                  </a>
                </li>
                {item.separator === "after" && <li className="br-line" />}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className={`overlay-pop${open ? " open" : ""}`} onClick={() => setOpen(false)} />
    </>
  );
}
