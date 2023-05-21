import { useAuthState } from 'react-firebase-hooks/auth'
import { useDisclosure } from '@chakra-ui/react'

import { auth } from '../../firebase/firebase'
import {
    getCurrentProgress,
    isHabitCompleted,
    toggleHabitCompletion
} from '../../pages/habits/helpers'
import { Habit } from '../../pages/habits/habits.types'
import { UpdateMetrics } from './UpdateMetrics'
import { ProgressForm } from './UpdateHabitMetrics/ProgressForm'

export const UpdateHabitMetrics: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const [user] = useAuthState(auth)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const progress = getCurrentProgress(habit)
    const isCompleted = isHabitCompleted(habit)
    const toggleText = isCompleted
        ? `Completed ${habit.type === 'daily' ? 'today' : 'this week'} 🥳`
        : 'Set as completed'

    const onToggleChange = () => {
        toggleHabitCompletion({
            habit,
            completedToday: isCompleted,
            userID: user?.uid
        })
    }

    return (
        <>
            <UpdateMetrics
                toggleText={toggleText}
                onToggleChange={onToggleChange}
                isCompleted={isCompleted}
                target={habit.target}
                progress={progress}
                onClick={onOpen}
            />
            <ProgressForm
                progressFormOpen={isOpen}
                onProgressFormClose={onClose}
                habit={habit}
            />
        </>
    )
}
