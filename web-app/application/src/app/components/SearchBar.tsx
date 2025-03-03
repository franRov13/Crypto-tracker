'use client'

import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="mb-4">
            <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Search coins"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                    onSearch(e.target.value)
                }}
            />
        </div>
    )
}