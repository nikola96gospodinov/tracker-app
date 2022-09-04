import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'

import { AuthProvider } from '../context/AuthContext'
import { auth } from '../firebase/firebase'

import '../styles/style.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<User | null>()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }, [])

  return (
    <AuthProvider value={currentUser}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
