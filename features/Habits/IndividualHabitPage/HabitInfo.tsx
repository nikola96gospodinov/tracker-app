import { AiTwotoneEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Habit } from '../habits.types'
import { Dispatch } from '../../../typings'
import {
    getCurrentStreak,
    getLastCompletedFormatted,
    getLongestStreakRange,
    isHabitCompletedToday,
    toggleHabitCompletion
} from '../helpers'

import style from '../habit.module.scss'
import { useGetRelevantGoals } from '../../../hooks/useGetRelevantGoals'
import Spinner from '../../../components/UIElements/spinner'
import { GoalBox } from '../../Goals/GoalsList/GoalBox'
import ToggleSwitch from '../../../components/UIElements/ToggleSwitch'
import { auth } from '../../../firebase/firebase'

const HabitInfo: React.FunctionComponent<{
    habit: Habit
    setEditForm: Dispatch<boolean>
    setDeleteWarning: Dispatch<boolean>
}> = ({ habit, setEditForm, setDeleteWarning }) => {
    const [user] = useAuthState(auth)

    const lastCompletedDate =
        habit.currentStreak?.end ?? habit.longestStreak.end
    const lastCompleted = getLastCompletedFormatted(lastCompletedDate)
    const { isGoals, relevantGoals, loading } = useGetRelevantGoals(habit.id)

    const completedToday = isHabitCompletedToday(lastCompletedDate)
    const toggleText = completedToday ? '' : 'Completed?'

    const currentStreak = getCurrentStreak({
        lastCompletedDate: habit.currentStreak.end,
        currentStreak: habit.currentStreak.streak
    })

    return (
        <div className={style.habitsPage}>
            <div className={style.headerSection}>
                <div>
                    🎯 {habit.target} {habit.metric} {habit.type}
                    <span>🔥{currentStreak}</span>
                    <ToggleSwitch
                        text={toggleText}
                        onToggle={toggleHabitCompletion({
                            habit,
                            completedToday,
                            userID: user?.uid
                        })}
                        checked={completedToday}
                    />
                </div>
                <div>
                    <AiTwotoneEdit
                        className={style.editIcon}
                        onClick={() => setEditForm(true)}
                    />
                    <RiDeleteBin6Fill
                        className={style.deleteIcon}
                        onClick={() => setDeleteWarning(true)}
                    />
                </div>
            </div>
            <h1>{habit.name}</h1>
            <p className={style.description}>{habit.description}</p>
            <p>
                <strong>Longest Streak:</strong> 🔥{habit.longestStreak.streak}{' '}
                <span className={style.longestStreakRange}>
                    {getLongestStreakRange(habit.longestStreak)}
                </span>
            </p>
            <p>
                <strong>Last Completed:</strong> {lastCompleted}
            </p>

            <h2>Linked Goals</h2>
            {loading && <Spinner size={7.5} />}
            {!isGoals && (
                <p>You haven&apos;t attached this habit to any of your goals</p>
            )}
            <div className='triple-grid'>
                {relevantGoals?.map((goal) => (
                    <GoalBox goal={goal} key={goal.id} />
                ))}
            </div>
        </div>
    )
}

export default HabitInfo
