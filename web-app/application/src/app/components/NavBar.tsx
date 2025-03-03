'use client'

import ThemeToggle from './ThemeToggle'
import RefreshButton from './RefreshButton'

interface NavbarProps {
    onSearch: (term: string) => void
    onRefresh: () => void
    isLoading: boolean
}

export default function Navbar({ onSearch, onRefresh, isLoading }: NavbarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Crypto Dashboard</h1>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                    <div className="relative w-full sm:w-auto">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20a 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full sm:w-64 p-2 pl-10 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <RefreshButton onRefresh={onRefresh} isLoading={isLoading} />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}