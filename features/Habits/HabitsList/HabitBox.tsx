import Link from 'next/link'

import { Habit } from '../habits.types'
import style from '../habit.module.scss'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompletedToday
} from '../helpers'

export const HabitBox: React.FunctionComponent<{
    habit: Habit
}> = ({
    habit: {
        urlPath,
        type,
        name,
        description,
        currentStreak,
        target,
        metric,
        progress
    }
}) => {
    const href = `/habits/${urlPath}`
    const streak = getCurrentStreak({
        lastCompletedDate: currentStreak.end,
        currentStreak: currentStreak.streak
    })
    const completedToday = isHabitCompletedToday(currentStreak.end)
    const weeklyTargetCompleted = (progress ?? 0) >= target
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
