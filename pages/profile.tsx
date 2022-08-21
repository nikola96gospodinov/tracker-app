import type { NextPage } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { User, signOut } from 'firebase/auth'

import { auth, db } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import useUserNotLogged from '../hooks/useUserNotLogged'

const Profile: NextPage = () => {
    const loading = useUserNotLogged()
    const user  = useContext(AuthContext) as User

    const getUser = () => {
        const userRef = doc(db, 'users', user.uid)
        getDoc(userRef)
            .then(res => console.log(res.data()))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (user) {
            getUser()
        }
    }, [user])

    if (loading) {
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