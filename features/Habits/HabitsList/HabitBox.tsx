import Link from 'next/link'

import { Habit } from '../habits.types'
import style from '../habit.module.scss'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompleted,
    isHabitCompletedToday
} from '../helpers'

export const HabitBox: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const {
        name,
        description,
        target,
        metric,
        type,
        urlPath,
        currentStreak,
        progress
    } = habit
    const href = `/habits/${urlPath}`
    const streak = getCurrentStreak({
        lastCompleted: currentStreak.end,
        currentStreak: currentStreak.streak,
        type
    })
    const completedToday = isHabitCompleted(habit)
    const weeklyTargetCompleted = (progress?.progress ?? 0) >= target
    const completed = completedToday || weeklyTargetCompleted
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
