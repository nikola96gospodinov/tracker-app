import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context/AuthContext'

const useUserNotLogged = (): boolean => {
    const [loading, setLoading] = useState(true)
    const user  = useContext(AuthContext) as User
    const router = useRouter()

    useEffect(() => {
        if (user === undefined) {
            setLoading(true)
        } else if (user === null) {
            router.push('/')
        } else {
            setLoading(false)
        }
    }, [user])

    return loading
}

export default useUserNotLogged