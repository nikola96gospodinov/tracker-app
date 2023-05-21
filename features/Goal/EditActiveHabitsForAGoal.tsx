import { FunctionComponent } from 'react'
import { EditActiveHabits } from '../EditActiveHabits/EditActiveHabits'
import useGetFilteredDocs from '../../hooks/useGetFilteredDocs'
import { Habit, HabitType } from '../../types/habits.types'
import { HABITS } from '../../constants/habitsConstants'
import { Goal } from '../../types/goals.types'

export const EditActiveHabitsForAGoal: FunctionComponent<{
    type: HabitType
    isOpen: boolean
    onClose: () => void
    goal: Goal
}> = ({ type, isOpen, onClose, goal }) => {
    const {
        docs: allHabits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
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
