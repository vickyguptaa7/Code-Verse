/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cascadia': ['Fira Code', 'sans-serif'],
        'sans':[ "-apple-system", 'BlinkMacSystemFont',
         "Helvetica Neue","Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"
        ]
      },
    },
    screens: {
      'xs':'410px',
      'sm':'510px',
      'smd': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
