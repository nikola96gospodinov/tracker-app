import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../firebase/firebase'

interface Props {
    userID: string | undefined
    path: string
    url: string
}

const useGetDoc = <T,>({ userID, path, url }: Props) => {
    const fullPath = `users/${userID}/${path}`
    const [doc, setDoc] = useState<T>()
    const [loading, setLoading] = useState(false)
    const [errorFetching, setErrorFetching] = useState(false)
    const docsCollection = collection(db, fullPath)
    const docQuery = query(docsCollection, where('urlPath', '==', url ?? ''))

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
    }, [])

    return { doc, loading, errorFetching }
}

export default useGetDoc
