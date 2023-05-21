import { useEffect, useState } from 'react'

import { GOALS } from '../constants/goalsConstants'
import { Goal } from '../types/goals.types'
import { HabitType } from '../types/habits.types'
import useGetDocs from './useGetDocs'

interface Props {
    habitID: string
    habitType: HabitType
}

export const useGetRelevantGoals = ({ habitID, habitType }: Props) => {
    const [isGoals, setIsGoals] = useState<boolean>()
    const { docs: goals, loading } = useGetDocs<Goal>({
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
