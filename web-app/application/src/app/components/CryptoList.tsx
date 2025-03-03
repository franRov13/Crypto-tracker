'use client'

import Image from 'next/image'

// Define the crypto type for better TypeScript support
import { CryptoAsset } from '../lib/api'

interface CryptoListProps {
    cryptos: CryptoAsset[] | undefined
}

export default function CryptoList({ cryptos }: CryptoListProps) {
    if (!cryptos || cryptos.length === 0) {
        return <p className="text-center py-8 dark:text-gray-300">No cryptocurrencies found.</p>
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cryptos.map((crypto) => (
                <div key={crypto.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <Image
                            src={crypto.image}
                            alt={crypto.name}
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <div>
                            <h2 className="font-bold dark:text-white">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
                            <p className="text-2xl dark:text-gray-200">${crypto.current_price.toLocaleString()}</p>
                            <p className={`${crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {crypto.price_change_percentage_24h.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}