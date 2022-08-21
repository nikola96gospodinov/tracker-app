import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { collection, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'

import { auth, db } from '../firebase/firebase'
import { AuthContext } from '../context/AuthContext'
import useUserLogged from '../hooks/useUserLogged'

const Register: NextPage = () => {
    const loading = useUserLogged()
    const user  = useContext(AuthContext) as User
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    const registerUser = (): void => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const usersCollectionRef = collection(db, 'users')
                setDoc(doc(usersCollectionRef, res.user.uid), {
                    email: email,
                    id: res.user.uid
                })
                setEmail('')
                setPassword('')
            })
            .catch(err => console.log(err.message))
    }

    if (loading) {
        return (
            <div>
                Loading... 
            </div>
        )
    }
 
    return (
        <div style={{
            padding: '2rem'
        }}>
            Email:
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            Password:
            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/>
            <button onClick={() => registerUser()}>Register</button>
        </div>
    )
}

export default Register