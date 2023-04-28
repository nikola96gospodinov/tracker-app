import Link from 'next/link'

import { Habit } from '../habits.types'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompleted
} from '../helpers'

import style from '../habit.module.scss'

export const HabitBox: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const { name, description, target, metric, type, urlPath, currentStreak } =
        habit
    const href = `/habits/${urlPath}`
    const streak = getCurrentStreak({
        lastCompleted: currentStreak.end,
        currentStreak: currentStreak.streak,
        type
    })
    const completed = isHabitCompleted(habit)
    const Icon = getHabitCompletionIcon(completed)
    const boxStyle = completed
        ? style.habitBoxCompleted
        : style.habitBoxIncompleted

    return (
        <Link href={href}>
            <a className={`${style.habitBox} ${boxStyle}`}>
                <div className={style.streak}>{`🔥${streak}`}</div>
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
                <div className={style.bottomContainer}>
                    <p>
                        🎯 {target} {metric} {type}
                    </p>
                    <Icon />
                </div>
            </a>
        </Link>
    )
}
