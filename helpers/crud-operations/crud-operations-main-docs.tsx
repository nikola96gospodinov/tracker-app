import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore'
import { NextRouter } from 'next/router'
import { ToastProps } from '@chakra-ui/react'

import { db } from '../../firebase/firebase'
import { Doc, ErrorsDispatch } from '../../types/crud-opearations.types'
import { Dispatch } from '../../typings'
import { toastConfig, Toast } from '../../components/UIElements/Toast'

interface SubmitDocProps<T> {
    path: string
    userID: string | undefined
    orgDoc: T
    setError?: Dispatch<boolean>
    setErrors?: ErrorsDispatch
    setDocsFormOpen?: Dispatch<boolean>
    reducerAction?: () => void
    router?: NextRouter
    toast?: any
    toastSuccessMessage?: string
    toastErrorMessage?: string
}

export const submitDoc = async <T extends Doc>({
    path,
    orgDoc,
    userID,
    setDocsFormOpen,
    setError,
    setErrors,
    reducerAction,
    router,
    toast,
    toastSuccessMessage,
    toastErrorMessage
}: SubmitDocProps<T>) => {
    const fullPath = `users/${userID}/${path}`
    const docsCollection = collection(db, fullPath)
    const docsRef = doc(docsCollection, orgDoc.id)
    const isDocExists = (await getDoc(docsRef)).exists()

    try {
        if (isDocExists) {
            await updateDoc(docsRef, {
                ...orgDoc
            })
        } else {
            await setDoc(docsRef, orgDoc)
        }

        if (setDocsFormOpen) setDocsFormOpen(false)
        if (router) router.push(`/${path}/${orgDoc.urlPath}`)
        if (toast) {
            toast({
                ...toastConfig,
                render: ({ onClose }: ToastProps) => (
                    <Toast
                        type='success'
                        text={toastSuccessMessage ?? 'Success!'}
                        onClose={onClose}
                    />
                )
            })
        }
    } catch (e) {
        console.log(e)
        if (setErrors) {
            setErrors((prev) => ({
                ...prev,
                form: true
            }))
        }
        if (setError) setError(true)
        if (reducerAction) reducerAction()
        if (toast) {
            toast({
                ...toastConfig,
                render: ({ onClose }: ToastProps) => (
                    <Toast
                        type='error'
                        text={toastErrorMessage ?? 'Error!'}
                        onClose={onClose}
                    />
                )
            })
        }
    }
}

interface RemoveDocProps<T> {
    path: string
    orgDoc: T
    userID: string | undefined
    router: NextRouter
    setError: Dispatch<boolean>
    noRedirect?: boolean
    toast?: any
    toastSuccessMessage?: string
    toastErrorMessage?: string
}

export const removeDoc = async <T extends Doc>({
    path,
    orgDoc,
    userID,
    router,
    setError,
    noRedirect,
    toast,
    toastSuccessMessage,
    toastErrorMessage
}: RemoveDocProps<T>) => {
    const fullPath = `users/${userID}/${path}`
    const docsCollection = collection(db, fullPath)
    const docsRef = doc(docsCollection, orgDoc.id)

    try {
        await deleteDoc(docsRef)
        if (!noRedirect) router.push(`/${path}`)
        if (toast) {
            toast({
                ...toastConfig,
                render: ({ onClose }: ToastProps) => (
                    <Toast
                        type='success'
                        text={toastSuccessMessage ?? 'Success!'}
                        onClose={onClose}
                    />
                )
            })
        }
    } catch (e) {
        console.log(e)
        setError(true)
        if (toast) {
            toast({
                ...toastConfig,
                render: ({ onClose }: ToastProps) => (
                    <Toast
                        type='error'
                        text={toastErrorMessage ?? 'Error!'}
                        onClose={onClose}
                    />
                )
            })
        }
    }
}
