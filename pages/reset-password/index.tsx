import { NextPage } from 'next/types'
import { useEffect, useReducer, useState } from 'react'
import Link from 'next/link'
import {
    useAuthState,
    useSendPasswordResetEmail
} from 'react-firebase-hooks/auth'
import { Button, Heading } from '@chakra-ui/react'

import Spinner from '../../components/UIElements/spinner'
import { auth } from '../../firebase/firebase'
import { validateEmail } from '../../helpers/string-validator-functions'
import ErrorIcon from '../../components/Icons/ErrorIcon'
import { Input } from '../../components/Form/ChakraInput'

type ActionType =
    | {
          type: 'SET_EMAIL'
          payload: string
      }
    | {
          type: 'SET_IS_SUCCESS' | 'SET_FORM_ERROR' | 'SET_EMAIL_ERROR'
          payload: boolean
      }

const initialState = {
    email: '',
    emailError: false,
    formError: false,
    isSuccess: false
}

const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            }
        case 'SET_EMAIL_ERROR':
            return {
                ...state,
                emailError: action.payload
            }
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.payload
            }
        case 'SET_IS_SUCCESS':
            return {
                ...state,
                isSuccess: action.payload
            }
        default:
            return state
    }
}

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
                        <Heading as='h1' fontSize='2xl' fontWeight={600}>
                            Reset Password
                        </Heading>
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
                                errorText='Please enter a valid email'
                                isError={emailError}
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
                        {formError && (
                            <div className='form-error'>
                                <ErrorIcon />
                                <span>
                                    There was an issue with the password reset.
                                    Please try again
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
