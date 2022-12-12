import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
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
    const [allDocs, setAllDocs] = useState<DocData<T>>()
    const [errorFetching, setErrorFetching] = useState(false)
    const docsCollectionRef = collection(db, path)
    const docsRef = doc(db, path, userID)
    const emptyDocsArray = {
        data: [] as T[]
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(docsRef,
            (docsSnapshot) => {
                const docsExists = docsSnapshot?.exists()
                const docsData = docsSnapshot?.data() as DocData<T>

                if (docsExists === false) {
                    setDoc(doc(docsCollectionRef, userID), emptyDocsArray)
                    setAllDocs(emptyDocsArray)
                } else {
                    setAllDocs(docsData)
                }
            },
            (error) => {
                console.log(error)
                setErrorFetching(true)
            }
        )

        return () => unsubscribe()
    }, [])

    const docs = allDocs?.data

    return { docs, errorFetching }
}

export default useGetDocs
