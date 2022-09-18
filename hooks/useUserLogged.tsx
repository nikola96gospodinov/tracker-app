import { useAuthUser } from "@react-query-firebase/auth"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { auth } from "../firebase/firebase"

const useUserLogged = (): boolean => {
    const { data: user, isLoading } = useAuthUser(["user"], auth)
    const router = useRouter()

    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/login')
        }
    }, [user, isLoading])

    return isLoading
}

export default useUserLogged