'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCryptoData } from './lib/api'
import SearchBar from './components/SearchBar'
import RefreshButton from './components/RefreshButton'
import Image from 'next/image'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
  })

  const filteredData = data?.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5)

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Crypto Price Tracker</h1>

      <div className="mb-4 flex justify-between items-center">
        <SearchBar onSearch={setSearchTerm} />
        <RefreshButton onRefresh={() => refetch()} isLoading={isLoading} />
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-red-500">Error loading data. Please try again.</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredData?.map((crypto) => (
          <div key={crypto.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Image
                src={crypto.image}
                alt={crypto.name}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h2 className="font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
                <p className="text-2xl">${crypto.current_price.toLocaleString()}</p>
                <p className={crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}