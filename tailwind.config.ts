import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "xl": '1200px',
        "sm": '640px',
        "md": '768px',
        "xs": "480px",
        "lg": '960px',
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        modalParentBgLight: "#0000007f",
        textwhite: "#FFFFFF",
        textdark: "#000112",
        textgray: "#828FA3",
        border_mediumGray: "#3E3F4E",
        border_lightBlue: "#E4EBFA",

      },
    },
  },
  plugins: [],
}
export default config
