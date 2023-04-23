import { Habit } from '../habits.types'
import { Dispatch } from '../../../typings'
import {
    getCurrentStreak,
    getLastCompletedFormatted,
    getLongestStreakRange
} from '../helpers'
import { useGetRelevantGoal } from '../../../hooks/useGetRelevantGoals'
import Spinner from '../../../components/UIElements/spinner'
import { GoalBox } from '../../Goals/GoalsList/GoalBox'
import EditIcon from '../../../components/Icons/EditIcon'
import DeleteIcon from '../../../components/Icons/DeleteIcon'
import { UpdateHabitMetrics } from '../UpdateHabitMetrics'

import style from '../habit.module.scss'

const HabitInfo: React.FunctionComponent<{
    habit: Habit
    setEditForm: Dispatch<boolean>
    setDeleteWarning: Dispatch<boolean>
}> = ({ habit, setEditForm, setDeleteWarning }) => {
    const lastCompleted = habit.currentStreak?.end ?? habit.longestStreak.end
    const lastCompletedFormatted = getLastCompletedFormatted(lastCompleted)
    const { isGoals, relevantGoals, loading } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    const currentStreak = getCurrentStreak({
        lastCompleted,
        currentStreak: habit.currentStreak.streak,
        type: habit.type
    })

    return (
        <div className={style.habitsPage}>
            <div className={style.headerSection}>
                <div>
                    🎯 {habit.target} {habit.metric} {habit.type}
                    <span>🔥{currentStreak}</span>
                    <UpdateHabitMetrics habit={habit} />
                </div>
                <div>
                    <EditIcon
                        className={style.editIcon}
                        onClick={() => setEditForm(true)}
                    />
                    <DeleteIcon
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
                    {getLongestStreakRange(habit.longestStreak, habit.type)}
                </span>
            </p>
            <p>
                <strong>Last Completed:</strong> {lastCompletedFormatted}
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
