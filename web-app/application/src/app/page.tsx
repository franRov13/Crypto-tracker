'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CryptoAsset, fetchCryptoData } from './lib/api'
import CryptoList from './components/CryptoList'
import Navbar from './components/NavBar'

export default function Home() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, error, refetch } = useQuery<Array<CryptoAsset>>({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    staleTime: 0,
    refetchOnWindowFocus: false
  })

  const filteredData = data?.filter((crypto: { name: string; symbol: string }) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5)

  const handleRefresh = async () => {
    await queryClient.removeQueries({ queryKey: ['cryptoData'] });
    await refetch({ throwOnError: true, cancelRefetch: false });
  };

  return (
    <>
      <Navbar
        onSearch={setSearchTerm}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      <div className="min-h-screen pt-24 p-8 bg-white dark:bg-gray-900 text-base">
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">
            <p>Error: {error instanceof Error ? error.message : "Failed to load data"}</p>
            <p className="text-sm mt-2">Please wait a moment before trying again.</p>
          </div>
        )}

        <CryptoList cryptos={filteredData} />
      </div>
    </>
  )
}