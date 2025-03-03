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
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Crypto Dashboard</h1>
                </div>

                <div className="flex items-center justify-between gap-3 w-full md:w-auto">
                    <div className="flex-grow md:w-64 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full p-2 pl-10 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <RefreshButton onRefresh={onRefresh} isLoading={isLoading} />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}