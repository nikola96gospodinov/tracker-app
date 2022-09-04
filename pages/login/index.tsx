import { User, signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { MdErrorOutline } from 'react-icons/md'

import { AuthContext } from '../../context/AuthContext'
import { auth } from '../../firebase/firebase'
import useUserLogged from '../../hooks/useUserLogged'
import Spinner from '../../components/spinner'

const Login: NextPage = () => {
    const loading = useUserLogged()
    const user  = useContext(AuthContext) as User
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>()

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    const logUser = (): void => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/profile')
            })
            .catch(() => {
                setErrorMessage('Wrong email or password')
            })
    }

    if (loading) {
        return (
            <div className='full-screen-centered'>
                <Spinner />
            </div>
        )
    }
    
    return (
        <div className='full-screen-centered form-background'>
            <div className='form-container'>
                <h1>Login</h1>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={() => logUser()}
                    className='button button-primary'
                >Login</button>
                <Link href='/reset-password'>
                    <a className='button button-link'>Forgot your password?</a>
                </Link>
                <span
                    className='redirect'
                    style={{
                        marginBottom: errorMessage ? '1rem' : 0
                    }}
                >
                    Don&#39;t have an account?&nbsp; 
                    <Link href='/register'>
                        <a className='button button-link'>Sign up</a>
                    </Link>
                </span>
                {
                    errorMessage ?
                        <div className='form-error'>
                            <MdErrorOutline />
                            <span>{errorMessage}</span>
                        </div> 
                        : <></>
                }
            </div>
        </div>
    )
}

export default Login