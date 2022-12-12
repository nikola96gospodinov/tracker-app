import { collection, doc, setDoc } from "firebase/firestore"
import { NextRouter } from "next/router"
import { db } from "../../../firebase/firebase"
import { Goal } from "../interfaces"

const goalsCollection = collection(db, 'goals')

interface Errors {
    nameErr: string
    categoryErr: boolean
    form: boolean
}
interface AddGoalsProps {
    goals: Goal[] | undefined
    newGoal: Goal
    userID: string
    setGoalsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    errors: Errors
    setErrors: React.Dispatch<React.SetStateAction<Errors>>
}

export const addGoal = async ({ goals, newGoal, userID, setGoalsFormOpen, errors, setErrors }: AddGoalsProps) => {
    const goalsRef = doc(goalsCollection, userID)

    if (goals) {
        try {
            setDoc(goalsRef, { data: [...goals, newGoal] }, { merge: true })
            setGoalsFormOpen(false)
        } catch (e) {
            console.log(e)
            setErrors({
                ...errors,
                form: true
            })
        }
    }
}

interface UpdateGoalProps {
    goals: Goal[] | undefined
    goal: Goal
    updatedGoal: Goal
    userID: string
    setGoalsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    errors: Errors
    setErrors: React.Dispatch<React.SetStateAction<Errors>>
}

export const updateGoal = async ({ goals, goal, updatedGoal, userID, setGoalsFormOpen, errors, setErrors }: UpdateGoalProps) => {
    const goalsRef = doc(goalsCollection, userID)

    if (goals) {
        try {
            setDoc(goalsRef, { data: [...goals.filter(g => goal?.id !== g.id ), updatedGoal] }, { merge: true })
            setGoalsFormOpen(false)
        } catch (e) {
            console.log(e)
            setErrors({
                ...errors,
                form: true
            })
        }
    }
}

interface DeleteGoalProps {
    goals: Goal[] | undefined
    goal: Goal
    userID: string
    router: NextRouter
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

export const deleteGoal = async ({ goals, goal, userID, router, setError }: DeleteGoalProps) => {
    const goalsRef = doc(goalsCollection, userID)

    if (goals) {
        try {
            setDoc(goalsRef, { data: [...goals.filter(g => goal?.id !== g.id )] })
            router.push('/goals')
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }
}