import {
    collection,
    onSnapshot,
    query,
    where,
    WhereFilterOp
} from 'firebase/firestore'
import { useState, useEffect, useContext } from 'react'

import { db } from '../firebase/firebase'
import { UserContext } from '../context/userContext'

interface Props {
    path: string
    fieldPath: string
    opStr: WhereFilterOp
    value: any
}

const useGetFilteredDocs = <T,>({ path, fieldPath, opStr, value }: Props) => {
    const { userId } = useContext(UserContext)
    const fullPath = `users/${userId}/${path}`
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
