import { FunctionComponent, useContext } from 'react'
import { EditActiveHabits } from '../../../../features/EditActiveHabits/EditActiveHabits'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import { Habit } from '../../../habits/habits.types'
import { UserContext } from '../../../../context/userContext'
import { HABITS } from '../../../habits/constants'
import { Goal } from '../../goals.types'

export const EditActiveHabitsForAGoal: FunctionComponent<{
    type: 'daily' | 'weekly'
    isOpen: boolean
    onClose: () => void
    goal: Goal
}> = ({ type, isOpen, onClose, goal }) => {
    const { userId } = useContext(UserContext)
    const {
        docs: allHabits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: userId,
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: type
    })

    const activeHabits = allHabits?.filter(({ id }) =>
        goal[`${type}Habits`]?.includes(id)
    )
    const inactiveHabits = allHabits?.filter(
        ({ id }) => !goal[`${type}Habits`]?.includes(id)
    )

    return (
        <EditActiveHabits
            isOpen={isOpen}
            onClose={onClose}
            activeHabits={activeHabits ?? []}
            inactiveHabits={inactiveHabits ?? []}
            loading={loading}
            errorFetching={errorFetching}
            isOnGoal
            goal={goal}
        />
    )
}
