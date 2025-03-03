'use client'

import { useState, useEffect } from 'react'

export default function RefreshButton({ onRefresh, isLoading }: {
    onRefresh: () => void,
    isLoading: boolean
}) {
    const [cooldown, setCooldown] = useState(false)
    const [countdown, setCountdown] = useState(10)

    useEffect(() => {
        if (!isLoading && cooldown) {
            // Set initial countdown value
            setCountdown(10)

            // Create interval to update countdown every second
            const countdownInterval = setInterval(() => {
                setCountdown(prevCount => {
                    if (prevCount <= 1) {
                        clearInterval(countdownInterval)
                        setCooldown(false)
                        return 10
                    }
                    return prevCount - 1
                })
            }, 1000)

            // Clear interval after 10 seconds or when component unmounts
            const timer = setTimeout(() => {
                clearInterval(countdownInterval)
                setCooldown(false)
            }, 10000)

            return () => {
                clearTimeout(timer)
                clearInterval(countdownInterval)
            }
        }
    }, [isLoading, cooldown])

    const handleClick = () => {
        if (!cooldown && !isLoading) {
            onRefresh()
            setCooldown(true)
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={isLoading || cooldown}
            className="px-4 py-2 bg-black-500 text-white rounded 
                      hover:bg-black-600 disabled:bg-black-300
                      cursor-pointer
                      transform transition-all duration-100
                      hover:shadow-md
                      active:translate-y-0.5
                      active:shadow-sm
                      disabled:cursor-not-allowed"
        >
            {isLoading ? 'Refreshing...' : cooldown ? `Wait ${countdown}s` : 'Refresh'}
        </button>
    )
}