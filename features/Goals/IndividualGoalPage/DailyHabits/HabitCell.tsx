import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

import { Habit } from '../../../Habits/habits.types'
import ToggleSwitch from '../../../../components/UIElements/ToggleSwitch'
import { auth } from '../../../../firebase/firebase'

import styles from '../../goal.module.scss'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompletedToday,
    toggleHabitCompletion
} from '../../../Habits/helpers'

const HabitCell: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const [user] = useAuthState(auth)

    const lastCompletedDate = habit.currentStreak?.end
    const completedToday = isHabitCompletedToday(lastCompletedDate)
    const completedClass = completedToday
        ? styles.completedHabitCell
        : styles.incompletedHabitCell
    const Icon = getHabitCompletionIcon(completedToday)
    const toggleText = completedToday ? '' : 'Completed?'
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
                <ToggleSwitch
                    text={toggleText}
                    onToggle={toggleHabitCompletion({
                        habit,
                        completedToday,
                        userID: user?.uid
                    })}
                    checked={completedToday}
                />
                <Icon />
            </div>
        </div>
    )
}

export default HabitCell
