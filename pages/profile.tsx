import type { NextPage } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import useUserLogged from '../hooks/useUserLogged'
import { useAuthUser } from '@react-query-firebase/auth'

import { auth, db } from '../firebase/firebase'

const Profile: NextPage = () => {
    const isLoading = useUserLogged()
    const { data: user } = useAuthUser(['user'], auth)

    const getUser = () => {
        if (user) {
            const userRef = doc(db, 'users', user?.uid)
            getDoc(userRef)
                .then(res => console.log(res.data()))
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        getUser()
    }, [user])

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div>
            Profile
            <br/>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    )
}

export default Profile