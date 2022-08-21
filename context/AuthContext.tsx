import { User } from 'firebase/auth'
import React from 'react'

export const AuthContext = React.createContext<User | null | undefined>(undefined)

interface AuthProviderProps {
    children: JSX.Element
    value: User | null | undefined
}

export const AuthProvider = ({children, value}: AuthProviderProps): JSX.Element => {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}