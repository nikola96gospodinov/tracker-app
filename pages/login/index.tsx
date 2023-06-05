import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
    useAuthState,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth'
import { Box, Button, Stack } from '@chakra-ui/react'
import Head from 'next/head'

import { auth } from '../../firebase/firebase'
import { Input } from '../../components/Form/Input'
import { FormError } from '../../components/Form/FormError'
import { FormHeading } from '../../components/Form/FormHeading'
import { Link } from '../../components/UIElements/Link'
import { FormHolder } from '../../components/Form/FormHolder'
import { FullScreenLoader } from '../../components/FullScreenLoader'

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
        if (emailRef.current?.value && passwordRef.current?.value) {
            signInWithEmailAndPassword(
                emailRef.current?.value,
                passwordRef.current?.value
            )
        }
    }

    if (isLoading || user) return <FullScreenLoader />

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name='description' content='Login into Solve Life' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <FormHolder>
                <FormHeading>Login</FormHeading>
                <form onSubmit={(e) => logUser(e)}>
                    <Stack gap={3}>
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
                        />
                        <Button
                            type='submit'
                            isLoading={isLoadingSignIn}
                            w='100%'
                            mt={4}
                        >
                            Login
                        </Button>
                    </Stack>
                </form>
                <Link href='/reset-password' variant='link' textAlign='center'>
                    Forgot your password?
                </Link>
                <Box textAlign='center'>
                    Don&#39;t have an account?&nbsp;
                    <Link href='/register' variant='link'>
                        Sign up
                    </Link>
                </Box>
                <FormError
                    formError={!!errorMessage}
                    errorText={errorMessage}
                />
            </FormHolder>
        </>
    )
}

export default Login
