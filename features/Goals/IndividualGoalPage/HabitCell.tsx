import Link from 'next/link'

import { Habit } from '../../Habits/habits.types'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompleted
} from '../../Habits/helpers'

import styles from '../goal.module.scss'
import { UpdateHabitMetrics } from '../../Habits/UpdateHabitMetrics'

const HabitCell: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const lastCompleted = habit.currentStreak?.end
    const completed = isHabitCompleted(habit)
    const completedClass = completed
        ? styles.completedHabitCell
        : styles.incompletedHabitCell
    const Icon = getHabitCompletionIcon(completed)
    const currentStreak = getCurrentStreak({
        lastCompleted,
        currentStreak: habit.currentStreak.streak,
        type: habit.type
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
