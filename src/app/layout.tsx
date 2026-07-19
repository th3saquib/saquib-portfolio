import type { Metadata, Viewport } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import BootstrapClient from "@/hooks/BootstrapClient";
import SmoothScroll from "@/hooks/SmoothScroll";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Saquib Ali | Web Developer & Automation Engineer",
    description:
        "Saquib Ali - Web Developer & Automation Engineer. Specializing in high-performance websites and workflow automation. Let's build your next project!",
    authors: [{ name: "Saquib Ali" }],
    keywords: ["Saquib Ali", "Web Developer", "Automation Specialist", "WordPress Developer", "PHP Developer", "N8N Automation", "Claude API", "Delhi Developer"],
    alternates: {
        canonical: "https://craftwrk.online",
    },
    openGraph: {
        title: "Saquib Ali | Web Developer & Automation Engineer",
        description: "Saquib Ali - Web Developer & Automation Engineer. Specializing in high-performance websites and workflow automation. Let's build your next project!",
        url: "https://craftwrk.online",
        siteName: "Saquib Ali Portfolio",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "https://craftwrk.online/assets/images/logo/favicon.svg",
                width: 512,
                height: 512,
                alt: "Saquib Ali Logo",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Saquib Ali | Web Developer & Automation Engineer",
        description: "Saquib Ali - Web Developer & Automation Engineer. Specializing in high-performance websites and workflow automation. Let's build your next project!",
    },
    icons: {
        icon: "/assets/images/logo/favicon.svg",
        apple: "/assets/images/logo/favicon.svg",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-US" suppressHydrationWarning>
            <head>
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
