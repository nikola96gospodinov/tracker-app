import { useContext, useEffect, useState } from 'react'

import { GOALS } from '../pages/goals/constants'
import { Goal } from '../pages/goals/goals.types'
import { HabitType } from '../pages/habits/habits.types'
import useGetDocs from './useGetDocs'
import { UserContext } from '../context/userContext'

interface Props {
    habitID: string
    habitType: HabitType
}

export const useGetRelevantGoals = ({ habitID, habitType }: Props) => {
    const { userId } = useContext(UserContext)
    const [isGoals, setIsGoals] = useState<boolean>()
    const { docs: goals, loading } = useGetDocs<Goal>({
        userID: userId,
        path: GOALS
    })

    useEffect(() => {
        if (!loading) {
            if (!relevantGoals || relevantGoals.length === 0) {
                setIsGoals(false)
            } else {
                setIsGoals(true)
            }
        }
    }, [loading])

    const relevantGoals = goals?.filter(({ dailyHabits, weeklyHabits }) => {
        if (habitType === 'daily') {
            return dailyHabits?.includes(habitID)
        } else {
            return weeklyHabits?.includes(habitID)
        }
    })

    return {
        isGoals,
        relevantGoals,
        loading
    }
}
