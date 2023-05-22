import {
    WhereFilterOp,
    collection,
    onSnapshot,
    query,
    where
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'

import { db } from '../firebase/firebase'
import { UserContext } from '../context/userContext'

interface Props {
    path: string
    property: string
    value: string
    opStr?: WhereFilterOp
}

const useGetDoc = <T,>({ path, property, value, opStr }: Props) => {
    const { userId } = useContext(UserContext)
    const fullPath = `users/${userId}/${path}`
    const [doc, setDoc] = useState<T>()
    const [loading, setLoading] = useState(false)
    const [errorFetching, setErrorFetching] = useState(false)
    const docsCollection = collection(db, fullPath)
    const docQuery = query(
        docsCollection,
        where(property, opStr ?? '==', value ?? '')
    )

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(
            docQuery,
            (docSnapshot) => {
                const firstDoc = docSnapshot.docs[0]?.data() as T
                setDoc(firstDoc)
                setLoading(false)
            },
            (error) => {
                console.log(error)
                setErrorFetching(true)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [value])

    return { doc, loading, errorFetching }
}

export default useGetDoc
