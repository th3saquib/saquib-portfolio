"use client";

import { ReactLenis } from "lenis/react";

type SmoothScrollProps = {
    children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.2,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}