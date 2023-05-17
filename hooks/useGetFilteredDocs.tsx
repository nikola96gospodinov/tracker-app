import {
    collection,
    onSnapshot,
    query,
    where,
    WhereFilterOp
} from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { db } from '../firebase/firebase'

interface Props {
    userID: string | undefined
    path: string
    fieldPath: string
    opStr: WhereFilterOp
    value: any
}

const useGetFilteredDocs = <T,>({
    userID,
    path,
    fieldPath,
    opStr,
    value
}: Props) => {
    const fullPath = `users/${userID}/${path}`
    const [allDocs, setAllDocs] = useState<T[]>()
    const [loading, setLoading] = useState(false)
    const [errorFetching, setErrorFetching] = useState(false)
    const docsCollection = collection(db, fullPath)
    const docQuery = query(docsCollection, where(fieldPath, opStr, value))

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(
            docQuery,
            (docsSnapshot) => {
                const docs = docsSnapshot.docs.map((doc) => ({
                    ...doc.data()
                })) as T[]
                setAllDocs(docs)
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

    return { docs: allDocs, loading, errorFetching }
}

export default useGetFilteredDocs
