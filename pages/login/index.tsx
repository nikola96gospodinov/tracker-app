import Link from 'next/link'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

import { auth } from '../../firebase/firebase'
import Spinner from '../../components/spinner'
import useUserLogged from '../../hooks/useUserLogged'

const Login: NextPage = () => {
    const { user, isLoading } = useUserLogged()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>()
    const [signInWithEmailAndPassword, _user, isLoadingSignIn, error] =
        useSignInWithEmailAndPassword(auth)

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    useEffect(() => {
        if (error) setErrorMessage('There was a problem logging in')
    }, [error])

    const logUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        signInWithEmailAndPassword(email, password)
    }

    if (isLoading || user) {
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
                <form onSubmit={(e) => logUser(e)}>
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
                    <input
                        type='submit'
                        value='Login'
                        className='button button-primary'
                    />
                </form>
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
                {errorMessage && (
                    <div className='form-error'>
                        <MdErrorOutline />
                        <span>{errorMessage}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login
