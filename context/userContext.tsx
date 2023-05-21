import { FunctionComponent, PropsWithChildren, createContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'

type UserContextType = {
    userId: string | undefined
    isLoading: boolean
    error?: Error
}

export const UserContext = createContext<UserContextType>({
    userId: undefined,
    isLoading: false
})

export const UserProvider: FunctionComponent<PropsWithChildren> = ({
    children
}) => {
    const [user, isLoading, error] = useAuthState(auth)

    return (
        <UserContext.Provider value={{ userId: user?.uid, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}
