import { CgDanger } from 'react-icons/cg'
import { BsCheck2Circle } from 'react-icons/bs'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

import { Habit } from '../../../Habits/habits.types'
import ToggleSwitch from '../../../../components/UIElements/ToggleSwitch'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { HABITS } from '../../../Habits/constants'
import { auth } from '../../../../firebase/firebase'
import { getUpdatedStreaks } from './helpers'

import styles from '../../goal.module.scss'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompletedToday
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

    const toggleHabitCompletion = () => {
        const updatedStreaks = getUpdatedStreaks(habit, completedToday)
        submitDoc<Habit>({
            path: HABITS,
            userID: user?.uid ?? '',
            orgDoc: {
                id: habit.id,
                ...updatedStreaks
            } as Habit
        })
    }

    return (
        <div className={`${styles.habitCell} ${completedClass}`}>
            <div className={styles.iconsWrapper}>
                <span>🔥{currentStreak}</span>
                <Icon />
            </div>
            <Link href={`/habits/${habit.urlPath}`}>
                <a className={styles.habitLink}>
                    <h3>{habit.name}</h3>
                </a>
            </Link>
            <ToggleSwitch
                text={toggleText}
                onToggle={toggleHabitCompletion}
                checked={completedToday}
            />
        </div>
    )
}

export default HabitCell
