import { useAuthState } from 'react-firebase-hooks/auth'

import ToggleSwitch from '../../components/UIElements/ToggleSwitch'
import { auth } from '../../firebase/firebase'
import { isHabitCompletedToday, toggleHabitCompletion } from './helpers'
import SetProgressOnHabit from './SetProgressOnHabit/SetProgressOnHabit'
import { Habit } from './habits.types'

export const UpdateHabitMetrics: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const [user] = useAuthState(auth)
    const lastCompletedDate = habit.currentStreak?.end
    const completedToday = isHabitCompletedToday(lastCompletedDate)
    const toggleText = completedToday ? 'Completed!' : 'Set as completed'

    return (
        <>
            {habit.target === 1 ? (
                <ToggleSwitch
                    text={toggleText}
                    onChange={toggleHabitCompletion({
                        habit,
                        completedToday,
                        userID: user?.uid
                    })}
                    checked={completedToday}
                />
            ) : (
                <SetProgressOnHabit habit={habit} />
            )}
        </>
    )
}
