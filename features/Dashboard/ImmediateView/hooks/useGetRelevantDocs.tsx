import { useContext, useEffect } from 'react'

import {
    today,
    thisWeek
} from '../../../../helpers/date-manipulation-functions'
import { useGetAllActiveHabitsByType } from '../../../../hooks/useGetAllActiveHabitsByType'
import { HabitType } from '../../../../types/habits.types'
import { TabsNumbersDispatchContext } from '../../context/context'
import { useGetRelevantGoals } from './useGetRelevantGoals'
import { useGetRelevantMilestones } from './useGetRelevantMilestones'
import { useGetRelevantTodos } from './useGetRelevantTodos'

export const useGetRelevantDocs = (type: HabitType) => {
    const dispatch = useContext(TabsNumbersDispatchContext)

    const {
        activeHabits,
        loading: loadingHabits,
        errorFetching: errorFetchingHabits
    } = useGetAllActiveHabitsByType(type!)
    const {
        completedTodos,
        incompletedTodos,
        loading: loadingTodos,
        errorFetching: errorFetchingTodos
    } = useGetRelevantTodos(type!)
    const {
        completedMilestones,
        incompletedMilestones,
        loading: loadingMilestones,
        errorFetching: errorFetchingMilestones
    } = useGetRelevantMilestones(type!)
    const {
        completedGoals,
        incompletedGoals,
        loading: loadingGoals,
        errorFetching: errorFetchingGoals
    } = useGetRelevantGoals(type!)

    const loading =
        loadingHabits || loadingTodos || loadingMilestones || loadingGoals

    const errorFetching =
        errorFetchingHabits ||
        errorFetchingTodos ||
        errorFetchingMilestones ||
        errorFetchingGoals

    const totalLength =
        activeHabits.length +
        completedTodos.length +
        incompletedTodos.length +
        (completedMilestones?.length ?? 0) +
        (incompletedMilestones?.length ?? 0) +
        (completedGoals?.length ?? 0) +
        (incompletedGoals?.length ?? 0)

    const completedHabits = activeHabits.filter(
        ({ currentStreak: { end } }) => {
            if (type === 'daily') return end === today
            return end === thisWeek
        }
    )

    const incompletedHabits = activeHabits.filter(
        ({ currentStreak: { end } }) => {
            if (type === 'daily') return end !== today
            return end !== thisWeek
        }
    )

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: type === 'daily' ? 'SET_TODAY' : 'SET_THIS_WEEK',
                payload: {
                    activeDocsNumber:
                        incompletedHabits.length +
                        incompletedTodos.length +
                        (incompletedMilestones?.length ?? 0) +
                        (incompletedGoals?.length ?? 0),
                    inactiveDocsNumber:
                        completedHabits.length +
                        completedTodos.length +
                        (completedMilestones?.length ?? 0) +
                        (completedGoals?.length ?? 0)
                }
            })
        }
    }, [
        completedHabits.length,
        incompletedHabits.length,
        completedTodos.length,
        incompletedTodos.length,
        completedMilestones?.length,
        incompletedMilestones?.length,
        completedGoals?.length,
        incompletedGoals?.length,
        dispatch,
        type
    ])

    return {
        loading,
        errorFetching,
        totalLength,
        completedHabits,
        incompletedHabits,
        completedTodos,
        incompletedTodos,
        completedMilestones,
        incompletedMilestones,
        completedGoals,
        incompletedGoals
    }
}
