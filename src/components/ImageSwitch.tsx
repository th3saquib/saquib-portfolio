"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

type Props = {
  light: string;
  dark?: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
};

export function ImageSwitch({ light, dark, alt = "Image", width, height, className, loading = "lazy" }: Props) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const src = mounted && resolvedTheme === "dark" && dark ? dark : light;

  return (
    <Image
      className={["image-switch", className].filter(Boolean).join(" ")}
      loading={loading}
      width={width}
      height={height}
      src={src}
      alt={alt}
    />
  );
}
