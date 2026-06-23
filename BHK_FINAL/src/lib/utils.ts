import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imagePath(src: string) {
  const basePath = process.env.NODE_ENV === "production" ? "/BHK_FINAL" : "";
  // Ensure src starts with / if not present
  const safeSrc = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${safeSrc}`;
}
