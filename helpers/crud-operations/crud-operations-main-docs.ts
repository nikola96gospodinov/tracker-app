import {
    collection,
    doc,
    DocumentData,
    DocumentReference,
    setDoc
} from 'firebase/firestore'
import { NextRouter } from 'next/router'

import { db } from '../../firebase/firebase'
import { Doc, Errors, ErrorsDispatch } from '../../types/crud-opearations.types'
import { Dispatch } from './../../types/types'

interface DocProps<T> {
    docsRef: DocumentReference<DocumentData>
    docs: T[]
    setDocsFormOpen: Dispatch<boolean>
}

interface AddDocProps<T> extends DocProps<T> {
    newDoc: T
}

export const createDoc = <T>({
    docsRef,
    docs,
    newDoc,
    setDocsFormOpen
}: AddDocProps<T>) => {
    setDoc(docsRef, { data: [...docs, newDoc] }, { merge: true })
    setDocsFormOpen(false)
}

interface UpdateDocProps<T> extends DocProps<T> {
    orgDoc: T
    updatedDoc: T
}

export const updateDoc = <T extends Doc>({
    docsRef,
    docs,
    orgDoc,
    updatedDoc,
    setDocsFormOpen
}: UpdateDocProps<T>) => {
    setDoc(
        docsRef,
        {
            data: [...docs.filter((d) => orgDoc?.id !== d.id), updatedDoc]
        },
        { merge: true }
    )
    setDocsFormOpen(false)
}

interface SubmitDocProps<T> extends Omit<DocProps<T>, 'docsRef'> {
    path: string
    userID: string
    errors: Errors
    setErrors: ErrorsDispatch
    newDoc?: T
    orgDoc: T | undefined
    updatedDoc?: T
}

export const submitDoc = async <T extends Doc>({
    path,
    docs,
    newDoc,
    orgDoc,
    updatedDoc,
    userID,
    setDocsFormOpen,
    errors,
    setErrors
}: SubmitDocProps<T>) => {
    const docsCollection = collection(db, path)
    const docsRef = doc(docsCollection, userID)

    if (docs) {
        try {
            if (orgDoc) {
                updateDoc<T>({
                    docsRef,
                    docs,
                    orgDoc,
                    updatedDoc: updatedDoc as T,
                    setDocsFormOpen
                })
            } else {
                createDoc<T>({
                    docsRef,
                    docs,
                    newDoc: newDoc as T,
                    setDocsFormOpen
                })
            }
        } catch (e) {
            console.log(e)
            setErrors({
                ...errors,
                form: true
            })
        }
    }
}

interface RemoveDocProps<T> {
    path: string
    docs: T[] | undefined
    orgDoc: T
    userID: string
    router: NextRouter
    setError: Dispatch<boolean>
}

export const removeDoc = async <T extends Doc>({
    path,
    docs,
    orgDoc,
    userID,
    router,
    setError
}: RemoveDocProps<T>) => {
    const docsCollection = collection(db, path)
    const docsRef = doc(docsCollection, userID)

    if (docs) {
        try {
            setDoc(docsRef, {
                data: [...docs.filter((d) => orgDoc?.id !== d.id)]
            })
            router.push(`/${path}`)
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }
}
