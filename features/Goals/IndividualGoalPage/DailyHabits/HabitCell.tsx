import moment from 'moment'
import { CgDanger } from 'react-icons/cg'
import { BsCheck2Circle } from 'react-icons/bs'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Habit } from '../../../Habits/habits.types'
import styles from '../../goal.module.scss'
import ToggleSwitch from '../../../../components/UIElements/ToggleSwitch'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { HABITS } from '../../../Habits/constants'
import { auth } from '../../../../firebase/firebase'
import { getUpdatedStreaks } from './helpers'
import { formatDate } from '../../../../helpers/date-manipulation-functions'

const today = formatDate(moment())

const HabitCell: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const [user] = useAuthState(auth)

    const lastCompletedDate = habit.currentStreak?.end
    const completedToday = lastCompletedDate === today
    const completedClass = completedToday
        ? styles.completedHabitCell
        : styles.incompletedHabitCell
    const Icon = completedToday ? BsCheck2Circle : CgDanger
    const toggleText = completedToday ? '' : 'Completed?'

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
                <span>🔥{habit.currentStreak.streak}</span>
                <Icon />
            </div>
            <h3>{habit.name}</h3>
            <ToggleSwitch
                text={toggleText}
                onToggle={toggleHabitCompletion}
                checked={completedToday}
            />
        </div>
    )
}

export default HabitCell
