import Link from 'next/link'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import {
    useAuthState,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth'

import { auth } from '../../firebase/firebase'
import Spinner from '../../components/UIElements/spinner'
import { Button } from '../../components/UIElements/Button'

const Login: NextPage = () => {
    const [user, isLoading] = useAuthState(auth)
    const router = useRouter()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [signInWithEmailAndPassword, _user, isLoadingSignIn, error] =
        useSignInWithEmailAndPassword(auth)

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    useEffect(() => {
        if (error) setErrorMessage('Wrong email or password')
    }, [error])

    const logUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (emailRef.current?.value && passwordRef.current?.value) {
            signInWithEmailAndPassword(
                emailRef.current?.value,
                passwordRef.current?.value
            )
        }
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
                    <input ref={emailRef} id='email' type='email' />
                    <label htmlFor='password'>Password</label>
                    <input ref={passwordRef} id='password' type='password' />
                    <Button
                        type='submit'
                        text='Login'
                        btnClass='button-primary'
                        isLoading={isLoadingSignIn}
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
