import { collection, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { db } from '../firebase/firebase'

interface Props {
    userID: string | undefined
    path: string
}

const useGetDocs = <T,>({ userID, path }: Props) => {
    const fullPath = `users/${userID}/${path}`
    const [allDocs, setAllDocs] = useState<T[]>()
    const [loading, setLoading] = useState(false)
    const [errorFetching, setErrorFetching] = useState(false)
    const docsCollection = collection(db, fullPath)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(
            docsCollection,
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
    }, [])

    return { docs: allDocs, loading, errorFetching }
}

export default useGetDocs
