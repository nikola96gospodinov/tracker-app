import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MdErrorOutline } from 'react-icons/md'
import { useAuthCreateUserWithEmailAndPassword, useAuthUser } from '@react-query-firebase/auth'

import { auth } from '../../firebase/firebase'
import Spinner from '../../components/spinner'

export const validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const Register: NextPage = () => {
    const { data: user, isLoading } = useAuthUser(["user"], auth)
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
    const [triedSubmitting, setTriedSubmitting] = useState(false)
    const register = useAuthCreateUserWithEmailAndPassword(auth, {
        onSuccess() {
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            router.push('/')
        },
        onError() {
            setErrors({
                ...errors,
                form: true
            })
        }
    })

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    useEffect(() => {
        if (triedSubmitting) {
            if (!errors.email && !errors.confirmPassword && !errors.form && !passwordErrors.minLength && !passwordErrors.letter && !passwordErrors.number) {
                register.mutate({ email, password })
            }
        }
    }, [errors.email, errors.confirmPassword, errors.form, passwordErrors.minLength, passwordErrors.letter, passwordErrors.number, triedSubmitting])


    const FormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setPasswordErrors({
            minLength: password.length < 5 ? true : false,
            letter: password.search(/[a-z]/i) < 0 ? true : false,
            number: password.search(/[0-9]/) < 0 ? true : false
        })

        setErrors({
            ...errors,
            email: email.match(validateEmail) ? false : true,
            confirmPassword: password === confirmPassword ? false : true
        })

        setTriedSubmitting(true)
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
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className='field-error'>Please enter a valid email</span>}
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {
                        (passwordErrors.letter || passwordErrors.minLength || passwordErrors.number) &&
                        <span className='error-span'>
                            Your password must:
                            <ul>
                                <li className={passwordErrors.minLength ? 'field-error' : ''}>be at least 6 characters</li>
                                <li className={passwordErrors.letter ? 'field-error' : ''}>contain at least one letter</li>
                                <li className={passwordErrors.number ? 'field-error' : ''}>contain at least on number</li>
                            </ul>
                        </span>
                    }
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input
                        id='confirm-password'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <span className='field-error'>Passwords must match</span>}
                    <input
                        type='submit'
                        value='Register'
                        className='button button-primary'
                    />
                </form>
                <span
                    className='redirect'
                >
                    Already have an account?&nbsp; 
                    <Link href='/login'>
                        <a className='button button-link'>Login</a>
                    </Link>
                </span>
                {
                    errors.form &&
                        <div className='form-error'>
                            <MdErrorOutline />
                            <span>There was an issue with the registration. Please try again</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default Register