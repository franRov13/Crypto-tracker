'use client'

export default function RefreshButton({ onRefresh, isLoading }: {
    onRefresh: () => void,
    isLoading: boolean
}) {
    return (
        <button
            onClick={onRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
            {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
    )
}