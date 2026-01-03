/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                "fade-in": "fade-in 0.5s ease-out forwards",
                "fade-in-up": "fade-in-up 0.3s ease-out forwards",
                "slide-up": "slide-up 0.6s ease-out forwards",
                "scale-in": "scale-in 0.4s ease-out forwards",
            },
        },
    },
    plugins: [],
};