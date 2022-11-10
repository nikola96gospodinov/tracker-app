import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../../../firebase/firebase'
import { GoalsData, Goal } from '../interfaces'

const useGetGoals = (userID: string) => {
    const [allGoals, setAllGoals] = useState<GoalsData>()
    const [errorFetching, setErrorFetching] = useState(false)
    const goalsCollectionRef = collection(db, 'goals')
    const goalsRef = doc(db, 'goals', userID)

    const emptyGoalsArray = {
        data: [] as Goal[]
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(goalsRef,
            (goalsSnapshot) => {
                const goalsExists = goalsSnapshot?.exists()
                const goalsData = goalsSnapshot?.data() as GoalsData

                if (goalsExists === false) {
                    setDoc(doc(goalsCollectionRef, userID), emptyGoalsArray)
                    setAllGoals(emptyGoalsArray)
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

    const goals = allGoals?.data

    return { goals, errorFetching }
}

export default useGetGoals
