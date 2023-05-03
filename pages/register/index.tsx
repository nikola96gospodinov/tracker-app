import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
    useAuthState,
    useCreateUserWithEmailAndPassword
} from 'react-firebase-hooks/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Button, ListItem, Text, UnorderedList } from '@chakra-ui/react'

import { auth, db } from '../../firebase/firebase'
import Spinner from '../../components/UIElements/spinner'
import { validateEmail } from '../../helpers/string-validator-functions'
import { FormError } from '../../components/Form/FormError'
import { Input } from '../../components/Form/ChakraInput'
import { FormHeading } from '../../components/Form/FormHeading'

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

    if (isLoading || user) {
        return (
            <div className='full-screen-centered'>
                <Spinner />
            </div>
        )
    }

    const isPasswordError =
        passwordErrors.letter ||
        passwordErrors.minLength ||
        passwordErrors.number

    return (
        <div className='full-screen-centered form-background'>
            <div className='form-container'>
                <FormHeading text='Register' />
                <form onSubmit={(e) => FormSubmit(e)}>
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
                    <Button type='submit' isLoading={isLoadingRegister}>
                        Register
                    </Button>
                </form>
                <span className='redirect'>
                    Already have an account?&nbsp;
                    <Link href='/login'>
                        <a className='button button-link'>Login</a>
                    </Link>
                </span>
                <FormError
                    formError={errors.form}
                    errorText='There was an issue with the registration. Please try
                    again'
                />
            </div>
        </div>
    )
}

export default Register
