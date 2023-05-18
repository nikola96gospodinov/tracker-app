import { collection, onSnapshot } from 'firebase/firestore'
import { useState, useEffect, useContext } from 'react'

import { db } from '../firebase/firebase'
import { UserContext } from '../context/userContext'

interface Props {
    path: string
}

const useGetDocs = <T,>({ path }: Props) => {
    const { userId } = useContext(UserContext)
    const fullPath = `users/${userId}/${path}`
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
