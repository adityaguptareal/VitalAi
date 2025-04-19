/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3A82F6',
        'secondary': '#5B9CFF',
        'text-blue':"#2986EB",
        'background': '#F8FAFC',
        'grey': '#394149',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8',
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}
}
