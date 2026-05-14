import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}", "./index.html"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ===== FONT FAMILIES ===== */
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        figtree: ["var(--font-figtree)", "system-ui", "sans-serif"],
        wide: ["var(--font-wide)", "system-ui", "sans-serif"],
        semiwide: ["var(--font-semiwide)", "system-ui", "sans-serif"],
        condensed: ["var(--font-condensed)", "system-ui", "sans-serif"],
        compressed: ["var(--font-compressed)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      /* ===== FLUID FONT SIZES ===== */
      fontSize: {
        huge: ["var(--text-huge)", { lineHeight: "var(--leading-vtight)" }],
        display: ["var(--text-display)", { lineHeight: "var(--leading-tight)" }],
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-tight)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-snug)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-snug)" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--leading-normal)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-normal)" }],
        sm: ["var(--text-sm)", { lineHeight: "var(--leading-normal)" }],
        xs: ["var(--text-xs)", { lineHeight: "var(--leading-normal)" }],
      },

      /* ===== COLORS ===== */
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Named brand colors */
        "bg-light": "#F5F5F5",
        "bg-dark": "#242425",
        cta: "#90E8FF",
      },

      /* ===== BORDER RADIUS ===== */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ===== ANIMATIONS ===== */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
