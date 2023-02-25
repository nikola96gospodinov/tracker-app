import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    setDoc
} from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { db } from '../firebase/firebase'

interface DocData<T> {
    data: T[]
}

interface Props {
    userID: string
    path: string
}

const useGetDocs = <T,>({ userID, path }: Props) => {
    const fullPath = `users/${userID}/${path}`
    const [allDocs, setAllDocs] = useState<T[]>()
    const [loading, setLoading] = useState(false)
    const [errorFetching, setErrorFetching] = useState(false)
    const docsCollection = collection(db, fullPath)

    const fetchDocs = async () => {
        setLoading(true)
        try {
            const documents = await getDocs(docsCollection)
            const docs = documents.docs.map((doc) => ({ ...doc.data() })) as T[]
            setAllDocs(docs)
        } catch {
            setErrorFetching(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchDocs()
    }, [])

    return { docs: allDocs, loading, errorFetching }
}

export default useGetDocs
