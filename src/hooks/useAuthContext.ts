'use client'
import { AuthContext } from '@/providers/AuthProvider'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    // console.log("context", context)

    if (!context) {
        throw Error("Auth context must be used inside an AuthContextProvider")
    }

    return context
}