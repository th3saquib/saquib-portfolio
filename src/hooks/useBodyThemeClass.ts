"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

type BodyThemeClassOptions = {
    defaultMode?: "dark" | "light";
};

export function useBodyThemeClass({ defaultMode = "dark" }: BodyThemeClassOptions = {}) {
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        if (defaultMode === "light" && typeof window !== "undefined" && !localStorage.getItem("darkMode")) {
            setTheme("light");
        }
    }, [defaultMode, setTheme]);

    useEffect(() => {
        const body = document.body;
        const currentTheme = resolvedTheme || defaultMode;

        // Clean up legacy variant classes to lock colors to fixed light & dark
        const legacyClasses = [
            "body-default",
            "body-v1",
            "body-v2",
            "body-v3",
            "dark-v1",
            "dark-v2",
            "dark-v3",
        ];
        legacyClasses.forEach((cls) => body.classList.remove(cls));
        try {
            localStorage.removeItem("saquib-color-variant");
        } catch {}

        body.classList.remove("dark-mode", "light-mode");
        body.classList.add(currentTheme === "dark" ? "dark-mode" : "light-mode");
    }, [resolvedTheme, defaultMode]);
}
