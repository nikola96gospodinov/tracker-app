import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'

import { UserContext } from '../context/userContext'

const useUserLogged = () => {
    const { userId, isLoading } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!userId && !isLoading) {
            router.push('/login')
        }
    }, [userId, isLoading])
}

export default useUserLogged
