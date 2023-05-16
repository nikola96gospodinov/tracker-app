import { useContext, useEffect, useState } from 'react'
import { uniq, uniqBy } from 'lodash'

import { UserContext } from '../../../context/userContext'
import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../habits/constants'
import { Habit } from '../../habits/habits.types'
import useGetDocs from '../../../hooks/useGetDocs'
import { GOALS } from '../../goals/constants'
import { Goal } from '../../goals/goals.types'

export const useGetAllActiveHabitsByType = (type: 'daily' | 'weekly') => {
    const { userId } = useContext(UserContext)
    const [activeHabits, setActiveHabits] = useState<Habit[]>([])

    const {
        docs: allHabits,
        loading: loadingHabits,
        errorFetching: errorFetchingHabits
    } = useGetFilteredDocs<Habit>({
        userID: userId,
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
        userID: userId,
        path: GOALS
    })

    const isGoals = !loadingGoals && !errorFetchingGoals

    useEffect(() => {
        if (isGoals && isHabits) {
            const attachedHabitIds: string[] = []
            goals?.forEach((goal) => {
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

    return { activeHabits, loading, errorFetching }
}
