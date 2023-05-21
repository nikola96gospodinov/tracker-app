import { FunctionComponent } from 'react'
import { EditActiveHabits } from '../../features/EditActiveHabits/EditActiveHabits'
import { useGetAllActiveHabitsByType } from './hooks/useGetAllActiveHabitsByType'
import { HabitType } from '../habits/habits.types'

export const EditActiveHabitsOnDashboard: FunctionComponent<{
    type: HabitType
    isOpen: boolean
    onClose: () => void
}> = ({ type, isOpen, onClose }) => {
    const { activeHabits, inactiveHabits, loading, errorFetching } =
        useGetAllActiveHabitsByType(type)

    return (
        <EditActiveHabits
            isOpen={isOpen}
            onClose={onClose}
            activeHabits={activeHabits}
            inactiveHabits={inactiveHabits}
            loading={loading}
            errorFetching={errorFetching}
        />
    )
}
