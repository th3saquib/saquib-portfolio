"use client";

import { useTheme } from "next-themes";
import { navItems } from "@/data/nav";
import { useMounted } from "@/hooks/useMounted";

type DesktopSidebarProps = {
  positionClass?: string;
};

export function DesktopSidebar({ positionClass = "pst-v1" }: DesktopSidebarProps = {}) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const currentTheme = resolvedTheme || theme || "dark";
  const isDark = mounted ? currentTheme === "dark" : true;

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`sidebar-tools ${positionClass}`}>
      <div className="nav-top">
        <div 
          role="button" 
          tabIndex={0} 
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          className={`tf-btn-icon toggle-switch-mode${isDark ? " active" : ""}`} 
          onClick={handleToggle}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggle(); }}
        >
          <i className="icon icon-light" />
        </div>
      </div>
      <ul className="nav-list">
        {navItems.map((item, i) => (
            <li  key={item.href + i} className="nav-item">
              <a href={item.href} className="item-link scroll-link">
                <i className={`icon ${item.icon}`} />
                <p className="tool-tip text-caption">{item.label}</p>
              </a>
            </li>
        ))}
      </ul>
      <div className="nav-bottom">
        <a href="#home" aria-label="Scroll to top" className="tf-btn-icon go-top" onClick={goTop}>
          <i className="icon icon-arrow-top" />
        </a>
      </div>
    </div>
  );
}
