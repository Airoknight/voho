import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0F2822", // Dark Moody Green
                    foreground: "#D4AF37", // Golden Yellow
                },
                secondary: {
                    DEFAULT: "#D4AF37", // Golden Yellow
                    foreground: "#0F2822", // Dark Moody Green
                },
                muted: {
                    DEFAULT: "#f4f4f5",
                    foreground: "#71717a",
                },
                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#0F2822",
                },
                accent: {
                    DEFAULT: "#D4AF37",
                    foreground: "#0F2822",
                },
                // Custom Armenia.travel Palette (Updated Mapping)
                "green-pea": "#0F2822", // Mapped to Primary
                "wine-berry": "#551528",
                "big-stone": "#162130",
                "cobalt": "#0047AB",
                "apricot": "#FBCEB1",
                "cowboy": "#D4AF37", // Mapped to Secondary
                "purple-haze": "#4E387E", // Inferred from 'bgPurpleHaze'
            },
            fontFamily: {
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                playfair: ["var(--font-playfair)", "serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            keyframes: {
                "jello-vertical": {
                    "0%, 100%": { transform: "scale3d(1, 1, 1)" },
                    "30%": { transform: "scale3d(0.75, 1.25, 1)" },
                    "40%": { transform: "scale3d(1.25, 0.75, 1)" },
                    "50%": { transform: "scale3d(0.85, 1.15, 1)" },
                    "65%": { transform: "scale3d(1.05, 0.95, 1)" },
                    "75%": { transform: "scale3d(0.95, 1.05, 1)" },
                },
            },
            animation: {
                "jello": "jello-vertical 0.9s both",
            },
        },
    },
    plugins: [],
};
export default config;
