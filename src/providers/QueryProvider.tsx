'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
    children: React.ReactNode
}

export const QueryProvider = ({ children }: Props) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
        queries: {
          retry: 1,
          // refetchOnMount: true,
        },
      },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer />
    </QueryClientProvider>
  )
}

