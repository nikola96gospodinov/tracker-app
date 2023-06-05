import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
    useAuthState,
    useCreateUserWithEmailAndPassword
} from 'react-firebase-hooks/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import {
    Box,
    Button,
    ListItem,
    Stack,
    Text,
    UnorderedList
} from '@chakra-ui/react'
import Head from 'next/head'

import { auth, db } from '../../firebase/firebase'
import { validateEmail } from '../../helpers/string-validator-functions'
import { FormError } from '../../components/Form/FormError'
import { Input } from '../../components/Form/Input'
import { FormHeading } from '../../components/Form/FormHeading'
import { Link } from '../../components/UIElements/Link'
import { FormHolder } from '../../components/Form/FormHolder'
import { FullScreenLoader } from '../../components/FullScreenLoader'

const NameErrors: React.FunctionComponent<{
    passwordErrors: {
        minLength: boolean
        letter: boolean
        number: boolean
    }
}> = ({ passwordErrors }) => {
    const errors = {
        minLength: 'be at least 6 characters',
        letter: 'contain at least one letter',
        number: 'contain at least one number'
    }

    return (
        <Text>
            Your password must:
            <UnorderedList>
                {Object.entries(errors).map(([key, value]) => (
                    <ListItem
                        color={
                            passwordErrors[key as keyof typeof passwordErrors]
                                ? 'red.600'
                                : 'neutral.900'
                        }
                        key={key}
                    >
                        {value}
                    </ListItem>
                ))}
            </UnorderedList>
        </Text>
    )
}

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
    const [createUserWithEmailAndPassword, userCred, isLoadingRegister, error] =
        useCreateUserWithEmailAndPassword(auth)

    useEffect(() => {
        if (user?.uid) router.push('/')
    }, [user?.uid])

    useEffect(() => {
        if (error) setErrors((prev) => ({ ...prev, form: true }))
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

    const createUserDocument = async (uid: string) => {
        await setDoc(doc(db, 'users', uid), {
            uid,
            createdAt: serverTimestamp()
        })
    }

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user.uid)
        }
    }, [userCred])

    if (isLoading || user) return <FullScreenLoader />

    const isPasswordError =
        passwordErrors.letter ||
        passwordErrors.minLength ||
        passwordErrors.number

    return (
        <>
            <Head>
                <title>Register</title>
                <meta name='description' content='Register into Solve Life' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <FormHolder>
                <FormHeading>Register</FormHeading>
                <form onSubmit={(e) => FormSubmit(e)} autoComplete='off'>
                    <Stack gap={3}>
                        <Input
                            label='Email'
                            ref={emailRef}
                            id='email'
                            type='email'
                            isError={errors.email}
                            errorContent='Please enter a valid email'
                        />
                        <Input
                            label='Password'
                            ref={passwordRef}
                            id='password'
                            type='password'
                            isError={isPasswordError}
                            errorContent={
                                <NameErrors passwordErrors={passwordErrors} />
                            }
                        />
                        <Input
                            label='Confirm Password'
                            ref={confirmPasswordRef}
                            id='confirm-password'
                            type='password'
                            isError={errors.confirmPassword}
                            errorContent='Passwords must match'
                        />
                        <Button
                            type='submit'
                            isLoading={isLoadingRegister}
                            w='100%'
                            mt={4}
                        >
                            Register
                        </Button>
                    </Stack>
                </form>
                <Box textAlign='center' mt={6}>
                    Already have an account?&nbsp;
                    <Link href='/login' variant='link'>
                        Login
                    </Link>
                </Box>
                <FormError
                    formError={errors.form}
                    errorText='There was an issue with the registration. Please try
                    again'
                />
            </FormHolder>
        </>
    )
}

export default Register
