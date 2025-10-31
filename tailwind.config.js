/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#1F2937',
        accent: '#F59E0B',
        dark: '#111827',
        light: '#F3F4F6',
      },
      // Supprimer la référence à tailwindcss-filters qui n'est pas installé
      screens: {
        'lg-only': '1024px',
      },
    },
  },
  plugins: [
    // Supprimer le plugin tailwindcss-filters qui cause l'erreur
  ],
}