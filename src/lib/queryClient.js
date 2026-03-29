import { QueryClient } from '@tanstack/react-query'
import { QUERY_CONFIG } from '@/lib/constants'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME_MS,
      retry: QUERY_CONFIG.RETRY_COUNT,
    },
  },
})
