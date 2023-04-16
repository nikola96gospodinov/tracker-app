import Link from 'next/link'

import { Habit } from '../../Habits/habits.types'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompletedToday
} from '../../Habits/helpers'

import styles from '../goal.module.scss'
import { UpdateHabitMetrics } from '../../Habits/UpdateHabitMetrics'

const HabitCell: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const lastCompletedDate = habit.currentStreak?.end
    const completedToday = isHabitCompletedToday(lastCompletedDate)
    const weeklyTargetCompleted = (habit.progress ?? 0) >= habit.target
    const completed = completedToday || weeklyTargetCompleted
    const completedClass = completed
        ? styles.completedHabitCell
        : styles.incompletedHabitCell
    const Icon = getHabitCompletionIcon(completed)
    const currentStreak = getCurrentStreak({
        lastCompletedDate,
        currentStreak: habit.currentStreak.streak
    })

    return (
        <div className={`${styles.habitCell} ${completedClass}`}>
            <div className={styles.wrapper}>
                <Link href={`/habits/${habit.urlPath}`}>
                    <a className={styles.habitLink}>
                        <h3>{habit.name}</h3>
                    </a>
                </Link>
                <span>🔥{currentStreak}</span>
            </div>
            <p>
                🎯 {habit.target} {habit.metric} {habit.type}
            </p>
            <div className={styles.wrapper}>
                <UpdateHabitMetrics habit={habit} />
                <Icon className={styles.habitCellIcon} />
            </div>
        </div>
    )
}

export default HabitCell
