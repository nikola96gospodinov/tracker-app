import moment from 'moment'
import { BsCheck2Circle } from 'react-icons/bs'
import { CgDanger } from 'react-icons/cg'

import { formatDate } from '../../helpers/date-manipulation-functions'

interface GetCurrentStreakProps {
    lastCompletedDate: string | undefined | null
    currentStreak: number
}

export const getCurrentStreak = ({
    lastCompletedDate,
    currentStreak
}: GetCurrentStreakProps): number => {
    const today = formatDate(moment())
    const yesterday = formatDate(moment().subtract(1, 'day'))
    const completedToday = lastCompletedDate === today
    const completedYesterday = lastCompletedDate === yesterday

    if (completedToday || completedYesterday) {
        return currentStreak
    }

    return 0
}

export const isHabitCompletedToday = (
    lastCompletedDate: string | undefined | null
): boolean => {
    const today = formatDate(moment())
    return lastCompletedDate === today
}

export const getHabitCompletionIcon = (completedToday: boolean) =>
    completedToday ? BsCheck2Circle : CgDanger
