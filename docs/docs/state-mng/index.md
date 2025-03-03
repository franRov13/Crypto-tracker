---
sidebar_position: 3
---

# State Management

This document explains the state management approach used in the Crypto Tracker application.

## React Query for Server State

The application uses [TanStack Query](https://tanstack.com/query) (formerly React Query) to manage server state. This library was chosen for several reasons:

### Benefits of React Query

1.  **Automatic caching**: Data is cached and made immediately available while refetching in the background
2.  **Automatic refetching**: Stale data is automatically refreshed
3.  **Parallel queries**: Multiple data sources can be queried simultaneously
4.  **Pagination and infinite scroll support**: For loading more data as needed
5.  **Devtools**: Powerful debugging tools for monitoring query states

### Implementation

React Query is set up in the `QueryProvider.tsx` component:

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}