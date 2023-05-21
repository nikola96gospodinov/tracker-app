import { useEffect, useState } from 'react'
import { difference, uniqBy } from 'lodash'

import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../habits/constants'
import { Habit, HabitType } from '../../habits/habits.types'
import useGetDocs from '../../../hooks/useGetDocs'
import { GOALS } from '../../goals/constants'
import { Goal } from '../../goals/goals.types'

export const useGetAllActiveHabitsByType = (type: HabitType) => {
    const [activeHabits, setActiveHabits] = useState<Habit[]>([])

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

            const keystoneHabits = allHabits?.filter(
                ({ isKeystone }) => isKeystone
            )

            setActiveHabits(
                uniqBy(
                    [
                        ...(keystoneHabits ? keystoneHabits : []),
                        ...(attachedHabits ? attachedHabits : [])
                    ],
                    'id'
                )
            )
        }
    }, [loadingGoals, loadingHabits, goals, allHabits])

    const loading = loadingHabits || loadingGoals
    const errorFetching = errorFetchingHabits || errorFetchingGoals

    const inactiveHabits = difference(allHabits, activeHabits)

    return { activeHabits, inactiveHabits, loading, errorFetching }
}
