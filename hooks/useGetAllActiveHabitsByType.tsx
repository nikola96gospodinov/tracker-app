import { useEffect, useState } from 'react'
import { difference } from 'lodash'

import useGetFilteredDocs from './useGetFilteredDocs'
import { HABITS } from '../constants/habitsConstants'
import { Habit, HabitType } from '../types/habits.types'
import useGetDocs from './useGetDocs'
import { GOALS } from '../constants/goalsConstants'
import { Goal } from '../types/goals.types'

export const useGetAllActiveHabitsByType = (type: HabitType) => {
    const [activeKeystoneHabits, setActiveKeystoneHabits] = useState<Habit[]>(
        []
    )
    const [activeAttachedHabits, setActiveAttachedHabits] = useState<Habit[]>(
        []
    )

    const {
        docs: allHabits,
        loading: loadingHabits,
        errorFetching: errorFetchingHabits
    } = useGetFilteredDocs<Habit>({
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: type
    })

    const isHabits = !loadingHabits && !errorFetchingHabits

    const {
        docs: goals,
        loading: loadingGoals,
        errorFetching: errorFetchingGoals
    } = useGetDocs<Goal>({
        path: GOALS
    })

    const isGoals = !loadingGoals && !errorFetchingGoals

    useEffect(() => {
        if (isGoals && isHabits) {
            const attachedHabitIds: string[] = []
            goals
                ?.filter(({ status }) => status === 'active')
                .forEach((goal) => {
                    if (goal[`${type}Habits`]) {
                        goal[`${type}Habits`]?.forEach((habitId) =>
                            attachedHabitIds.push(habitId)
                        )
                    }
                })

            const attachedHabits = allHabits?.filter(({ id }) =>
                attachedHabitIds.includes(id)
            )
            setActiveAttachedHabits(attachedHabits ? attachedHabits : [])

            const keystoneHabits = allHabits?.filter(
                ({ id, isKeystone }) =>
                    isKeystone && !attachedHabitIds.includes(id)
            )
            setActiveKeystoneHabits(keystoneHabits ? keystoneHabits : [])
        }
    }, [loadingGoals, loadingHabits, goals, allHabits])

    const loading = loadingHabits || loadingGoals
    const errorFetching = errorFetchingHabits || errorFetchingGoals

    const activeHabits = [...activeKeystoneHabits, ...activeAttachedHabits]
    const inactiveHabits = difference(allHabits, activeHabits)

    return {
        activeHabits,
        inactiveHabits,
        activeAttachedHabits,
        activeKeystoneHabits,
        loading,
        errorFetching
    }
}
