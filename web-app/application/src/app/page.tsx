'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CryptoAsset, fetchCryptoData } from './lib/api'
import CryptoList from './components/CryptoList'
import Navbar from './components/NavBar'

export default function Home() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('')
  const [isManualRefresh, setIsManualRefresh] = useState(false)

  const { data, isLoading, error, refetch } = useQuery<Array<CryptoAsset>>({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Auto-refresh every minute
    refetchOnWindowFocus: true, // Refresh when user returns to tab
    retry: (failureCount, error) => {
      // Don't retry if we hit the rate limit
      if (error instanceof Error && error.message.includes('Please wait')) {
        return false;
      }
      return failureCount < 3;
    }
  })

  const filteredData = data?.filter((crypto: { name: string; symbol: string }) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5)

  const handleRefresh = async () => {
    setIsManualRefresh(true);
    try {
      await queryClient.removeQueries({ queryKey: ['cryptoData'] });
      await refetch({ throwOnError: true, cancelRefetch: false });
    } catch (error) {
      console.log("API refresh limit reached, please wait before trying again");
    } finally {
      setIsManualRefresh(false);
    }
  };

  return (
    <>
      <Navbar
        onSearch={setSearchTerm}
        onRefresh={handleRefresh}
        isLoading={isLoading || isManualRefresh}
      />

      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900 text-base">
        <div className="max-w-7xl mx-auto">
          {(isLoading || isManualRefresh) && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && !isManualRefresh && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">
              <p>Error: {error instanceof Error ? error.message : "Failed to load data"}</p>
              <p className="text-sm mt-2">Please wait a moment before trying again.</p>
            </div>
          )}

          <CryptoList cryptos={filteredData} />

          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            {data && !isLoading && (
              <p>Auto-refreshes every minute. Last updated: {new Date().toLocaleTimeString()}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}