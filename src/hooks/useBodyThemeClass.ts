"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

type BodyThemeClassOptions = {
    defaultMode?: "dark" | "light";
};

export function useBodyThemeClass({ defaultMode = "dark" }: BodyThemeClassOptions = {}) {
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setTheme(defaultMode);
    }, []);

    useEffect(() => {
        const body = document.body;
        const currentTheme = resolvedTheme || defaultMode;

        body.classList.remove("dark-mode", "light-mode");
        body.classList.add(currentTheme === "dark" ? "dark-mode" : "light-mode");
    }, [resolvedTheme, defaultMode]);
}
