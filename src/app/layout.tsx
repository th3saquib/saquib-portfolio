import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import "./globals.scss";

export const metadata: Metadata = {
    metadataBase: new URL("https://craftwrk.online"),
    title: {
        default: "Saquib Ali | Web & ERPNext Developer | Automation Engineer",
        template: "%s | Saquib Ali",
    },
    description:
        "Saquib Ali - Web Developer, ERPNext & Frappe Developer, and Automation Engineer. Specializing in high-performance web applications, ERP customizations, and intelligent workflows.",
    authors: [{ name: "Saquib Ali", url: "https://craftwrk.online" }],
    creator: "Saquib Ali",
    publisher: "Saquib Ali",
    category: "technology",
    keywords: [
        "Saquib Ali",
        "Web Developer",
        "ERPNext Developer",
        "Frappe Developer",
        "Automation Specialist",
        "WordPress Developer",
        "PHP Developer",
        "N8N Automation",
        "Claude API",
        "Delhi Developer",
        "Full Stack Developer"
    ],
    alternates: {
        canonical: "https://craftwrk.online",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Saquib Ali | Web & ERPNext Developer | Automation Engineer",
        description: "Saquib Ali - Web Developer, ERPNext & Frappe Developer, and Automation Engineer. Specializing in high-performance web applications, ERP customizations, and intelligent workflows.",
        url: "https://craftwrk.online",
        siteName: "Saquib Ali Portfolio",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/assets/images/logo/favicon.svg",
                width: 512,
                height: 512,
                alt: "Saquib Ali Logo",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Saquib Ali | Web & ERPNext Developer | Automation Engineer",
        description: "Saquib Ali - Web Developer, ERPNext & Frappe Developer, and Automation Engineer. Specializing in high-performance web applications, ERP customizations, and intelligent workflows.",
        images: ["/assets/images/logo/favicon.svg"],
    },
    icons: {
        icon: "/assets/images/logo/favicon.svg",
        apple: "/assets/images/logo/favicon.svg",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#14151a" },
    ],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://craftwrk.online/#person",
            name: "Saquib Ali",
            jobTitle: "Web & ERPNext Developer | Automation Engineer",
            url: "https://craftwrk.online",
            image: "https://craftwrk.online/assets/images/photo-dark.jpg",
            description: "Full-stack Web Developer, ERPNext & Frappe Specialist, and Automation Engineer based in Delhi, India.",
            email: "mailto:saquib5259@gmail.com",
            telephone: "+919031547994",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressCountry: "IN",
            },
            sameAs: [
                "https://github.com/th3saquib",
                "https://www.linkedin.com/in/saquibali32",
                "https://g.dev/asaquib",
                "https://www.behance.net/saquibali1",
            ],
            knowsAbout: [
                "ERPNext",
                "Frappe Framework",
                "Next.js",
                "React",
                "TypeScript",
                "Python",
                "Workflow Automation",
                "N8N",
                "Claude API",
                "Web Development",
            ],
        },
        {
            "@type": "WebSite",
            "@id": "https://craftwrk.online/#website",
            url: "https://craftwrk.online",
            name: "Saquib Ali - Portfolio",
            description: "Personal Portfolio of Saquib Ali - Web & ERPNext Developer and Automation Engineer",
            publisher: {
                "@id": "https://craftwrk.online/#person",
            },
        },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-US" suppressHydrationWarning>
            <head>
                {/* Structured Data (JSON-LD) for Search Engines */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-MWJXKQ5N');`,
                    }}
                />
                {/* End Google Tag Manager */}
                {/* Google tag (gtag.js) */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-7K92Q68BPV" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-7K92Q68BPV');`,
                    }}
                />
            </head>
            <body>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-MWJXKQ5N"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}
                <BootstrapClient />
                <SmoothScroll>
                    <ThemeProvider>{children}</ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
