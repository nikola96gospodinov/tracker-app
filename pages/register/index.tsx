import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { MdErrorOutline } from 'react-icons/md'
import {
    useAuthState,
    useCreateUserWithEmailAndPassword
} from 'react-firebase-hooks/auth'

import { auth } from '../../firebase/firebase'
import Spinner from '../../components/UIElements/spinner'
import { validateEmail } from '../../helpers/string-validator-functions'
import { Button } from '../../components/UIElements/Button'

const Register: NextPage = () => {
    const [user, isLoading] = useAuthState(auth)
    const router = useRouter()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState({
        email: false,
        confirmPassword: false,
        form: false
    })
    const [passwordErrors, setPasswordErrors] = useState({
        minLength: false,
        letter: false,
        number: false
    })
    const [createUserWithEmailAndPassword, _user, isLoadingRegister, error] =
        useCreateUserWithEmailAndPassword(auth)

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    useEffect(() => {
        if (error) {
            setErrors({
                ...errors,
                form: true
            })
        }
    }, [error])

    const FormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const passErrors = {
            minLength: Number(passwordRef.current?.value.length) < 5,
            letter: Number(passwordRef.current?.value.search(/[a-z]/i)) < 0,
            number: Number(passwordRef.current?.value.search(/[0-9]/)) < 0
        }
        setPasswordErrors(passErrors)

        const otherErrors = {
            email: !emailRef.current?.value.match(validateEmail),
            confirmPassword: !(
                passwordRef.current?.value === confirmPasswordRef.current?.value
            )
        }
        setErrors({
            ...errors,
            ...otherErrors
        })

        const isNoErrors = Object.values({
            ...passErrors,
            ...otherErrors
        }).every((val) => val === false)

        if (isNoErrors) {
            createUserWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
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
                <h1>Register</h1>
                <form onSubmit={(e) => FormSubmit(e)}>
                    <label htmlFor='email'>Email</label>
                    <input ref={emailRef} id='email' type='email' />
                    {errors.email && (
                        <span className='field-error'>
                            Please enter a valid email
                        </span>
                    )}
                    <label htmlFor='password'>Password</label>
                    <input ref={passwordRef} id='password' type='password' />
                    {(passwordErrors.letter ||
                        passwordErrors.minLength ||
                        passwordErrors.number) && (
                        <span className='error-span'>
                            Your password must:
                            <ul>
                                <li
                                    className={
                                        passwordErrors.minLength
                                            ? 'field-error'
                                            : ''
                                    }
                                >
                                    be at least 6 characters
                                </li>
                                <li
                                    className={
                                        passwordErrors.letter
                                            ? 'field-error'
                                            : ''
                                    }
                                >
                                    contain at least one letter
                                </li>
                                <li
                                    className={
                                        passwordErrors.number
                                            ? 'field-error'
                                            : ''
                                    }
                                >
                                    contain at least one number
                                </li>
                            </ul>
                        </span>
                    )}
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input
                        ref={confirmPasswordRef}
                        id='confirm-password'
                        type='password'
                    />
                    {errors.confirmPassword && (
                        <span className='field-error'>
                            Passwords must match
                        </span>
                    )}
                    <Button
                        type='submit'
                        text='Register'
                        btnClass='button-primary'
                        isLoading={isLoadingRegister}
                    />
                </form>
                <span className='redirect'>
                    Already have an account?&nbsp;
                    <Link href='/login'>
                        <a className='button button-link'>Login</a>
                    </Link>
                </span>
                {errors.form && (
                    <div className='form-error'>
                        <MdErrorOutline />
                        <span>
                            There was an issue with the registration. Please try
                            again
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Register
