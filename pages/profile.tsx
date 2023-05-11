import type { NextPage } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { signOut } from 'firebase/auth'

import { auth, db } from '../firebase/firebase'
import { UserContext } from '../context/userContext'

const Profile: NextPage = () => {
    const { userId, isLoading } = useContext(UserContext)

    const getUser = () => {
        if (userId) {
            const userRef = doc(db, 'users', userId)
            getDoc(userRef)
                .then((res) => console.log(res.data()))
                .catch((error) => console.log(error))
        }
    }

    useEffect(() => {
        getUser()
    }, [userId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            Profile
            <br />
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    )
}

export default Profile
