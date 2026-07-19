export type NavItem = {
  href: string;
  label: string;
  icon: string;
  separator?: "before" | "after";
};

export const navItems: NavItem[] = [
  { href: "#home", label: "Home", icon: "icon-home", separator: "after" },
  { href: "#about", label: "About", icon: "icon-user-circle" },
  { href: "#education", label: "Education", icon: "icon-edu" },
  { href: "#work", label: "Work", icon: "icon-high-light" },
  { href: "#service", label: "Services", icon: "icon-service" },
  { href: "#tech", label: "Tech", icon: "icon-tech-stack" },
  { href: "#tech-logos", label: "Tech Stack", icon: "icon-tech-stack", separator: "after" },
  { href: "#contact", label: "Contact", icon: "icon-send" },
];
