import { useEffect, useState } from 'react'

import { GOALS } from '../features/Goals/constants'
import { Goal } from '../features/Goals/goals.types'
import { HabitType } from '../features/Habits/habits.types'
import useGetDocs from './useGetDocs'
import useUserLogged from './useUserLogged'

interface Props {
    habitID: string
    habitType: HabitType
}

export const useGetRelevantGoals = ({ habitID, habitType }: Props) => {
    const { userId } = useUserLogged()
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
