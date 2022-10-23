import { collection, doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { Goal } from '../pages/goals/interfaces'
import useGetGoals from './useGetGoals'

const useAddGoal = (userID: string, newGoal: Goal) => {
    const [errorAdding, setErrorAdding] = useState(false)
    
    const { allGoals } = useGetGoals(userID)
    const goalsCollection = collection(db, 'goals')
    const goalsRef = doc(goalsCollection, userID)

    useEffect(() => {
        const addGoal = async () => {
            if (allGoals) {
                try {
                    await setDoc(goalsRef, { activeGoals: [...allGoals!.activeGoals, newGoal] }, { merge: true })
                } catch (e) {
                    console.log(e)
                    setErrorAdding(true)
                }
            }
        }

        addGoal()
    }, [allGoals, goalsRef, newGoal])

    return errorAdding
}

export default useAddGoal