import { NextPage } from 'next/types'
import { useEffect, useReducer } from 'react'
import Link from 'next/link'
import {
    useAuthState,
    useSendPasswordResetEmail
} from 'react-firebase-hooks/auth'
import { Button, Heading } from '@chakra-ui/react'

import { Spinner } from '../../components/UIElements/Spinner'
import { auth } from '../../firebase/firebase'
import { validateEmail } from '../../helpers/string-validator-functions'
import { Input } from '../../components/Form/ChakraInput'
import { FormError } from '../../components/Form/FormError'
import { initialState, reducer } from './reducers'
import { FormHeading } from '../../components/Form/FormHeading'

const ResetPassword: NextPage = () => {
    const [user, isLoading] = useAuthState(auth)
    const [{ email, emailError, formError, isSuccess }, dispatch] = useReducer(
        reducer,
        initialState
    )
    const [sendPasswordResetEmail, isLoadindReseting, error] =
        useSendPasswordResetEmail(auth)

    const sendResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email.match(validateEmail)) {
            const success = await sendPasswordResetEmail(email)
            if (success) {
                dispatch({
                    type: 'SET_IS_SUCCESS',
                    payload: true
                })
                dispatch({
                    type: 'SET_FORM_ERROR',
                    payload: false
                })
            }
        } else {
            dispatch({
                type: 'SET_EMAIL_ERROR',
                payload: true
            })
        }
    }

    useEffect(() => {
        if (error) {
            dispatch({
                type: 'SET_FORM_ERROR',
                payload: true
            })
        }
    }, [error])

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
                {isSuccess ? (
                    <>
                        <span
                            style={{
                                fontSize: '1.25rem',
                                textAlign: 'center'
                            }}
                        >
                            An email with instructions for reseting your
                            password has been sent to your email.
                        </span>
                        <span
                            style={{
                                paddingTop: '.5rem',
                                textAlign: 'center',
                                paddingBottom: '1rem'
                            }}
                        >
                            Make sure to check your spam folder if you can{"'"}t
                            find the email.
                        </span>
                        <span className='redirect'>
                            <Link href='/'>
                                <a className='button button-primary'>
                                    Back to homepage
                                </a>
                            </Link>
                        </span>
                    </>
                ) : (
                    <>
                        <FormHeading text='Reset Password' />
                        <form onSubmit={(e) => sendResetEmail(e)}>
                            <Input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'SET_EMAIL',
                                        payload: e.target.value
                                    })
                                }
                                label='Email'
                                errorContent='Please enter a valid email'
                                isError={emailError}
                                isLast
                            />
                            <Button type='submit' isLoading={isLoadindReseting}>
                                Reset Password
                            </Button>
                        </form>
                        <span className='redirect'>
                            Don&#39;t have an account?&nbsp;
                            <Link href='/register'>
                                <a className='button button-link'>Sign up</a>
                            </Link>
                        </span>
                        <FormError
                            formError={formError}
                            errorText='There was an issue with the password reset.
                                    Please try again'
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
