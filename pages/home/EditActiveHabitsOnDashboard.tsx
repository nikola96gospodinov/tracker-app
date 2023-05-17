import { FunctionComponent } from 'react'
import { EditActiveHabits } from '../../features/EditActiveHabits/EditActiveHabits'
import { useGetAllActiveHabitsByType } from './hooks/useGetAllActiveHabitsByType'

export const EditActiveHabitsOnDashboard: FunctionComponent<{
    type: 'daily' | 'weekly'
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
