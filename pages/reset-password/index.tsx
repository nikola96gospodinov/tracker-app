import { NextPage } from 'next/types'
import { useEffect, useReducer } from 'react'
import {
    useAuthState,
    useSendPasswordResetEmail
} from 'react-firebase-hooks/auth'
import { Box, Button, Text } from '@chakra-ui/react'

import { auth } from '../../firebase/firebase'
import { validateEmail } from '../../helpers/string-validator-functions'
import { Input } from '../../components/Form/ChakraInput'
import { FormError } from '../../components/Form/FormError'
import { initialState, reducer } from './reducers'
import { FormHeading } from '../../components/Form/FormHeading'
import { Link } from '../../components/UIElements/Link'
import { FormHolder } from '../../components/Form/FormHolder'
import { FullScreenLoader } from '../../components/FullScreenLoader'

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

    if (isLoading || user) return <FullScreenLoader />

    return (
        <FormHolder>
            {isSuccess ? (
                <>
                    <Text fontSize='xl' textAlign='center' fontWeight={600}>
                        An email with instructions for reseting your password
                        has been sent to your email.
                    </Text>
                    <Text pt={2} textAlign='center' pb={4}>
                        Make sure to check your spam folder if you can{"'"}t
                        find the email.
                    </Text>
                    <Box textAlign='center' mt={4}>
                        <Link href='/login'>Back to Login page</Link>
                    </Box>
                </>
            ) : (
                <>
                    <FormHeading>Reset Password</FormHeading>
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
                        />
                        <Button
                            type='submit'
                            isLoading={isLoadindReseting}
                            w='100%'
                            mt={4}
                        >
                            Reset Password
                        </Button>
                    </form>
                    <Box textAlign='center' mt={6}>
                        Don&#39;t have an account?&nbsp;
                        <Link href='/register' variant='link'>
                            Sign up
                        </Link>
                    </Box>
                    <FormError
                        formError={formError}
                        errorText='There was an issue with the password reset.
                                    Please try again'
                    />
                </>
            )}
        </FormHolder>
    )
}

export default ResetPassword
