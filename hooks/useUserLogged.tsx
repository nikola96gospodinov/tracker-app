import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../firebase/firebase'

const useUserLogged = () => {
    const [user, isLoading, error] = useAuthState(auth)
    const router = useRouter()

    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/login')
        }
    }, [user, isLoading])

    return {
        user,
        isLoading,
        error
    }
}

export default useUserLogged
