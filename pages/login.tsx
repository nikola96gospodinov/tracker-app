import { User, signInWithEmailAndPassword } from 'firebase/auth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'

import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase/firebase'
import useUserLogged from '../hooks/useUserLogged'

const Login: NextPage = () => {
    const loading = useUserLogged()
    const user  = useContext(AuthContext) as User
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    const logUser = (): void => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/profile')
            })
            .catch(err => alert(err.message))
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
            <button onClick={() => logUser()}>Login</button>
        </div>
    )
}

export default Login