'use client'

import { useTheme } from '../providers/ThemeProvider'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-black-500 text-white rounded 
                       hover:bg-black-600 disabled:bg-black-300
                       cursor-pointer
                       transform transition-all duration-100
                       hover:shadow-md
                       active:translate-y-0.5
                       active:shadow-sm
                       active:bg-black-700
                       disabled:cursor-not-allowed
                       disabled:transform-none
                       disabled:hover:shadow-none"
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    )
}