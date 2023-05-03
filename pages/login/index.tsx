import Link from 'next/link'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
    useAuthState,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth'
import { Button } from '@chakra-ui/react'

import { auth } from '../../firebase/firebase'
import Spinner from '../../components/UIElements/spinner'
import { Input } from '../../components/Form/ChakraInput'
import { FormError } from '../../components/Form/FormError'
import { FormHeading } from '../../components/Form/FormHeading'

const Login: NextPage = () => {
    const [user, isLoading] = useAuthState(auth)
    const router = useRouter()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [signInWithEmailAndPassword, _user, isLoadingSignIn, error] =
        useSignInWithEmailAndPassword(auth)

    useEffect(() => {
        if (user?.uid) router.push('/')
    }, [user?.uid])

    useEffect(() => {
        if (error) setErrorMessage('Wrong email or password')
    }, [error])

    const logUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log('Logging in...')
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
                <FormHeading text='Login' />
                <form onSubmit={(e) => logUser(e)}>
                    <Input
                        ref={emailRef}
                        id='email'
                        type='email'
                        label='Email'
                    />
                    <Input
                        ref={passwordRef}
                        id='password'
                        type='password'
                        label='Password'
                        isLast
                    />
                    <Button type='submit' isLoading={isLoadingSignIn}>
                        Login
                    </Button>
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
                <FormError
                    formError={!!errorMessage}
                    errorText={errorMessage}
                />
            </div>
        </div>
    )
}

export default Login
