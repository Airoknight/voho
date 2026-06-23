import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imagePath(src: string) {
  let isGitHubPages = false;
  if (typeof window !== "undefined") {
    isGitHubPages = window.location.pathname.startsWith("/BHK_FINAL") || window.location.hostname.includes("github.io");
  } else {
    isGitHubPages = process.env.NODE_ENV === "production" && !process.env.VERCEL;
  }

  const basePath = isGitHubPages ? "/BHK_FINAL" : "";
  // Ensure src starts with / if not present
  const safeSrc = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${safeSrc}`;
}
