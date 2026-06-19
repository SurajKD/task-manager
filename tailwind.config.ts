import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'task-frontend': '#3B82F6',
        'task-backend': '#10B981',
        'task-qa': '#8B5CF6',
      },
    },
  },
  plugins: [],
}
export default config
