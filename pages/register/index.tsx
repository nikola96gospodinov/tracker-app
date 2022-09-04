import type { NextPage } from 'next'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { collection, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { MdErrorOutline } from 'react-icons/md'

import { auth, db } from '../../firebase/firebase'
import { AuthContext } from '../../context/AuthContext'
import useUserLogged from '../../hooks/useUserLogged'
import Spinner from '../../components/spinner'

const validateEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const Register: NextPage = () => {
    const loading = useUserLogged()
    const user  = useContext(AuthContext) as User
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

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    useEffect(() => {
        if (triedSubmitting) {
            if (!errors.email && !errors.confirmPassword && !errors.form && !passwordErrors.minLength && !passwordErrors.letter && !passwordErrors.number) {
                RegisterUser()
            }
        }
    }, [errors.email, errors.confirmPassword, errors.form, passwordErrors.minLength, passwordErrors.letter, passwordErrors.number, triedSubmitting])


    const FormSubmit = (): void => {
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

    const RegisterUser = (): void => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const usersCollectionRef = collection(db, 'users')
                setDoc(doc(usersCollectionRef, res.user.uid), {
                    email: email,
                    id: res.user.uid
                })
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            })
            .catch(() => setErrors({
                ...errors,
                form: true
            }))
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
                <h1>Register</h1>
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {
                    errors.email ?
                    <span className='field-error'>Please enter a valid email</span> :
                    <></>
                    
                }
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                    passwordErrors.letter || passwordErrors.minLength || passwordErrors.number ?
                    <span className='error-span'>
                        Your password must:
                        <ul>
                            <li className={passwordErrors.minLength ? 'field-error' : ''}>be at least 6 characters</li>
                            <li className={passwordErrors.letter ? 'field-error' : ''}>contain at least one letter</li>
                            <li className={passwordErrors.number ? 'field-error' : ''}>contain at least on number</li>
                        </ul>
                    </span> :
                    <></>
                }
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                    id='confirm-password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {
                    errors.confirmPassword ?
                    <span className='field-error'>Passwords must match</span> :
                    <></>
                }
                <button
                    onClick={() => FormSubmit()}
                    className='button button-primary'
                >Register</button>
                <span
                    className='redirect'
                >
                    Already have an account?&nbsp; 
                    <Link href='/login'>
                        <a className='button button-link'>Login</a>
                    </Link>
                </span>
                {
                    errors.form ?
                        <div className='form-error'>
                            <MdErrorOutline />
                            <span>There was an issue with the registration. Please try again</span>
                        </div> 
                        : <></>
                }
            </div>
        </div>
    )
}

export default Register