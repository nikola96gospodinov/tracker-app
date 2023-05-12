import { useAuthState } from 'react-firebase-hooks/auth'

import ToggleSwitch from '../../../../components/UIElements/ToggleSwitch'
import { auth } from '../../../../firebase/firebase'
import { isHabitCompleted, toggleHabitCompletion } from '../../helpers'
import SetProgressOnHabit from './SetProgress/SetProgressOnHabit'
import { Habit } from '../../habits.types'

export const UpdateHabitMetrics: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const [user] = useAuthState(auth)
    const isCompleted = isHabitCompleted(habit)
    const toggleText = isCompleted
        ? `Completed ${habit.type === 'daily' ? 'today' : 'this week'}!`
        : 'Set as completed'

    return (
        <>
            {habit.target === 1 ? (
                <ToggleSwitch
                    text={toggleText}
                    onChange={toggleHabitCompletion({
                        habit,
                        completedToday: isCompleted,
                        userID: user?.uid
                    })}
                    isChecked={isCompleted}
                    size='sm'
                />
            ) : (
                <SetProgressOnHabit habit={habit} />
            )}
        </>
    )
}
