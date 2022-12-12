import { NextPage } from 'next/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MdErrorOutline } from 'react-icons/md'
import { useAuthSendPasswordResetEmail, useAuthUser } from '@react-query-firebase/auth'

import Spinner from '../../components/spinner'
import { auth } from '../../firebase/firebase'
import { validateEmail } from '../../helpers/string-validator-functions'

const ResetPassword: NextPage = () => {
    const { isLoading } = useAuthUser(['user'], auth)
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({
        email: false,
        form: false
    })
    const [isSuccess, setIsSuccess] = useState(false)
    const passReset = useAuthSendPasswordResetEmail(auth, {
        onSuccess() {
            setIsSuccess(true)
        },
        onError() {
            setErrors({
                ...errors,
                form: true
            })
        }
    })

    const sendResetEmail = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (email.match(validateEmail)) {
            passReset.mutate({ email })
        } else {
            setErrors({
                ...errors,
                email: true
            })
        }
    }

    if (isLoading) {
        return (
            <div className='full-screen-centered'>
                <Spinner />
            </div>
        )
    }

    return (
        <div className='full-screen-centered form-background'>
            <div className='form-container'>
                {
                    isSuccess ?
                    <>
                        <span
                            style={{
                                fontSize: '1.25rem',
                                textAlign: 'center'
                            }}
                        >An email with instructions for reseting your password has been sent to your email.</span>
                        <span
                            style={{
                                paddingTop: '.5rem',
                                textAlign: 'center',
                                paddingBottom: '1rem'
                            }}
                        >Make sure to check your spam folder if you can{'\''}t find the email.</span>
                        <span
                            className='redirect'
                        >
                            <Link href='/'>
                                <a className='button button-primary'>Back to homepage</a>
                            </Link>
                        </span>
                    </>
                    :
                    <>
                        <h1>Reset Password</h1>
                        <form
                            onSubmit={(e) => sendResetEmail(e)}
                        >
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
                            <input
                                type='submit'
                                value='Reset password'
                                className='button button-primary'
                            />
                        </form>
                        <span
                            className='redirect'
                        >
                            Don&#39;t have an account?&nbsp; 
                            <Link href='/register'>
                                <a className='button button-link'>Sign up</a>
                            </Link>
                        </span>
                        {
                            errors.form &&
                                <div className='form-error'>
                                    <MdErrorOutline />
                                    <span>There was an issue with the registration. Please try again</span>
                                </div> 
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default ResetPassword