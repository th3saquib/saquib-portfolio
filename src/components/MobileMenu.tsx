"use client";

import { useState, useEffect } from "react";
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
        <div className="tf-btn-icon style-2" onClick={toggle}>
          <div className={`btn-mobile-menu${open ? " close" : ""}`}>
            <span />
          </div>
        </div>
        <div className={`nav-mobile-list${open ? " open" : ""}`}>
          <ul className="nav-mobile-item">
            {navItems.map((item, i) => (
              <div key={item.href + i}>
                <li className="nav-item">
                  <a href={item.href} className="item-link scroll-link" onClick={() => setOpen(false)}>
                    <i className={`icon ${item.icon}`} />
                    <p className="tool-tip text-caption">{item.label}</p>
                  </a>
                </li>
                {item.separator === "after" && <li className="br-line" />}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className={`overlay-pop${open ? " open" : ""}`} onClick={() => setOpen(false)} />
    </>
  );
}
