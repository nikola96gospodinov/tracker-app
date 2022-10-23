import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../firebase/firebase'
import { AllGoals } from '../pages/goals/interfaces'

const useGetGoals = (userID: string) => {
    const [allGoals, setAllGoals] = useState<AllGoals>()
    const [errorFetching, setErrorFetching] = useState(false)
    const goalsCollectionRef = collection(db, 'goals')
    const goalsRef = doc(db, 'goals', userID)

    const emptyGoals = {
        activeGoals: [],
        achievedGoals: [],
        archivedGoals: []
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(goalsRef,
            (goalsSnapshot) => {
                const goalsExists = goalsSnapshot?.exists()
                const goalsData = goalsSnapshot?.data() as AllGoals

                if (goalsExists === false) {
                    setDoc(doc(goalsCollectionRef, userID), emptyGoals)
                    setAllGoals(emptyGoals)
                } else {
                    setAllGoals(goalsData)
                }
            },
            (error) => {
                console.log(error)
                setErrorFetching(true)
            }
        )

        return () => unsubscribe()
    }, [])

    return { allGoals, errorFetching }
}

export default useGetGoals
