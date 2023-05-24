import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore'
import { NextRouter } from 'next/router'

import { db } from '../../firebase/firebase'
import { Doc, ErrorsDispatch } from '../../types/crud-opearations.types'
import { Dispatch } from '../../typings'

interface SubmitDocProps<T> {
    path: string
    userID: string | undefined
    orgDoc: T
    setError?: Dispatch<boolean>
    setErrors?: ErrorsDispatch
    setDocsFormOpen?: Dispatch<boolean>
    reducerAction?: () => void
    router?: NextRouter
}

export const submitDoc = async <T extends Doc>({
    path,
    orgDoc,
    userID,
    setDocsFormOpen,
    setError,
    setErrors,
    reducerAction,
    router
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
    }
}

interface RemoveDocProps<T> {
    path: string
    orgDoc: T
    userID: string | undefined
    router: NextRouter
    setError: Dispatch<boolean>
    noRedirect?: boolean
}

export const removeDoc = async <T extends Doc>({
    path,
    orgDoc,
    userID,
    router,
    setError,
    noRedirect
}: RemoveDocProps<T>) => {
    const fullPath = `users/${userID}/${path}`
    const docsCollection = collection(db, fullPath)
    const docsRef = doc(docsCollection, orgDoc.id)

    try {
        await deleteDoc(docsRef)
        if (!noRedirect) router.push(`/${path}`)
    } catch (e) {
        console.log(e)
        setError(true)
    }
}
