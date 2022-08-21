import { User } from "firebase/auth"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"

import { AuthContext } from "../context/AuthContext"

const useUserLogged = (): boolean => {
    const [loading, setLoading] = useState(true)
    const user  = useContext(AuthContext) as User
    const router = useRouter()

    useEffect(() => {
        if (user === undefined) {
            setLoading(true)
        } else if (user) {
            router.push('/')
        } else {
            setLoading(false)
        }
    }, [user])

    return loading
}

export default useUserLogged