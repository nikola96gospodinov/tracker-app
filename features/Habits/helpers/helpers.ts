import moment from 'moment'

import {
    formatDate,
    formatDateForUI,
    formatWeek,
    goOneDayBack,
    goOneDayForward,
    lastWeek,
    thisWeek,
    today,
    yesterday
} from '../../../helpers/date-manipulation-functions'
import { Habit, HabitType, Progress, Streak } from '../../../types/habits.types'
import CheckIcon from '../../../components/Icons/CheckIcon'
import DangerIcon from '../../../components/Icons/DangerIcon'

export const getUpdatedStreaksForDailyHabits = (
    habit: Habit,
    completedToday: boolean
) => {
    const longestStreak = habit.longestStreak
    const currentStreak = habit.currentStreak
    const completedYesterday = habit.currentStreak?.end === yesterday

    let newStreak = { ...currentStreak }

    if (completedYesterday) {
        if (completedToday) {
            newStreak = {
                streak: --newStreak.streak,
                start: newStreak?.start,
                end: goOneDayBack(newStreak?.end)
            }
        } else {
            newStreak = {
                streak: ++newStreak.streak,
                start: newStreak?.start,
                end: goOneDayForward(newStreak?.end)
            }
        }
    } else {
        if (completedToday) {
            if (newStreak?.start === newStreak?.end) {
                newStreak = {
                    streak: 0,
                    start: null,
                    end: newStreak?.lastEnd ?? null,
                    lastEnd: null
                }
            } else {
                newStreak = {
                    streak: --newStreak.streak,
                    start: newStreak?.start,
                    end: goOneDayBack(newStreak?.end)
                }
            }
        } else {
            newStreak = {
                streak: 1,
                start: today,
                end: today,
                lastEnd: newStreak?.end || null
            }
        }
    }

    console.log(newStreak)

    if (
        longestStreak.streak < newStreak.streak ||
        longestStreak.streak === currentStreak.streak
    ) {
        return {
            longestStreak: newStreak,
            currentStreak: newStreak
        }
    } else {
        return {
            longestStreak,
            currentStreak: newStreak
        }
    }
}

export const getUpdatedStreaksForWeeklyHabits = (
    habit: Habit,
    newProgress: Progress
) => {
    const longestStreak = habit.longestStreak
    const currentStreak = habit.currentStreak
    const isTargetHit = newProgress.totalProgress >= habit.target
    const completedThisWeek = currentStreak.end === thisWeek
    const completedLastWeek = currentStreak.end === lastWeek

    let newStreak = { ...currentStreak }

    if (completedLastWeek && isTargetHit) {
        newStreak = {
            streak: ++newStreak.streak,
            start: newStreak?.start,
            end: thisWeek
        }
    }

    if (completedThisWeek && !isTargetHit) {
        if (newStreak?.start === newStreak?.end) {
            newStreak = {
                streak: 0,
                start: null,
                end: newStreak?.lastEnd,
                lastEnd: null
            }
        } else {
            newStreak = {
                streak: --newStreak.streak,
                start: newStreak?.start,
                end: lastWeek
            }
        }
    }

    if (!completedThisWeek && !completedLastWeek && isTargetHit) {
        newStreak = {
            streak: 1,
            start: thisWeek,
            end: thisWeek,
            lastEnd: newStreak?.end || null
        }
    }

    // Returns
    if (
        longestStreak.streak < newStreak.streak ||
        longestStreak.streak === currentStreak.streak
    ) {
        return {
            longestStreak: newStreak,
            currentStreak: newStreak
        }
    } else {
        return {
            longestStreak,
            currentStreak: newStreak
        }
    }
}

interface GetCurrentDailyStreakProps {
    lastCompletedDate: string | undefined | null
    currentStreak: number
}

export const getCurrentDailyStreak = ({
    lastCompletedDate,
    currentStreak
}: GetCurrentDailyStreakProps): number => {
    const yesterday = formatDate(moment().subtract(1, 'day'))
    const completedToday = lastCompletedDate === today
    const completedYesterday = lastCompletedDate === yesterday

    if (completedToday || completedYesterday) {
        return currentStreak
    }

    return 0
}

interface GetCurrentWeeklyStreakProps {
    currentStreak: number
    lastCompletedWeek: string | undefined | null
}

export const getCurrentWeeklyStreak = ({
    currentStreak,
    lastCompletedWeek
}: GetCurrentWeeklyStreakProps) => {
    const thisWeek = formatWeek(moment())
    const lastWeek = formatWeek(moment().subtract(7, 'day'))
    const completedThisWeek = lastCompletedWeek === thisWeek
    const completedLastWeek = lastCompletedWeek === lastWeek

    if (completedThisWeek || completedLastWeek) {
        return currentStreak
    }

    return 0
}

interface GetCurrentStreakProps {
    currentStreak: number
    lastCompleted: string | undefined | null
    type: HabitType
}

export const getCurrentStreak = ({
    currentStreak,
    lastCompleted,
    type
}: GetCurrentStreakProps) => {
    return type === 'daily'
        ? getCurrentDailyStreak({
              lastCompletedDate: lastCompleted,
              currentStreak
          })
        : getCurrentWeeklyStreak({
              currentStreak,
              lastCompletedWeek: lastCompleted
          })
}

export const isHabitCompletedToday = (
    lastCompletedDate: string | undefined | null
): boolean => {
    return lastCompletedDate === today
}

interface IsHabitCompletedThisWeekProps {
    target: number
    progress?: Progress
    streakEnd?: string | null
}

export const isHabitCompletedThisWeek = ({
    progress,
    target,
    streakEnd
}: IsHabitCompletedThisWeekProps): boolean => {
    if (target === 1) {
        return streakEnd === thisWeek
    }

    return (
        progress?.totalProgress === target &&
        moment(progress.dateOfProgress).isSame(moment(), 'isoWeek')
    )
}

export const isHabitCompleted = (habit: Habit): boolean => {
    if (habit.type === 'daily') {
        return isHabitCompletedToday(habit.currentStreak.end)
    }

    return isHabitCompletedThisWeek({
        progress: habit.progress,
        target: habit.target,
        streakEnd: habit.currentStreak.end
    })
}

export const getHabitCompletionIcon = (completedToday: boolean) =>
    completedToday ? CheckIcon : DangerIcon

export const getLastCompleted = (
    lastCompleted: string | undefined | null,
    type: HabitType
): string => {
    if (type === 'daily') {
        const daysAgo = Math.abs(moment(lastCompleted).diff(today, 'days'))

        if (daysAgo === 0 && lastCompleted) return 'Today'
        if (daysAgo === 1) return 'Yesterday'
        if (daysAgo > 1) return `${daysAgo} days ago`
    }

    if (type === 'weekly' && lastCompleted) {
        const week = lastCompleted.slice(5, 7)
        const year = lastCompleted.slice(-4)
        const weeksAgo = Math.abs(
            moment().isoWeekYear(+year).isoWeek(+week).diff(moment(), 'weeks')
        )

        if (weeksAgo === 0 && lastCompleted) return 'This Week'
        if (weeksAgo === 1) return 'Last Week'
        if (weeksAgo > 1) return `${weeksAgo} weeks ago`
    }

    return 'Never'
}

export const getLongestStreakRange = (
    longestStreak: Streak,
    habitType: HabitType
): string => {
    if (
        longestStreak.start &&
        longestStreak.end &&
        longestStreak.start !== longestStreak.end
    )
        if (habitType === 'daily')
            return `${formatDateForUI(longestStreak.start)} - ${formatDateForUI(
                longestStreak.end
            )}`
        else return `${longestStreak.start} - ${longestStreak.end}`

    return ''
}

export const getCurrentProgress = (habit: Habit): number => {
    if (habit.type === 'daily' && habit.progress?.dateOfProgress === today)
        return habit.progress.totalProgress

    if (
        habit.type === 'weekly' &&
        habit.progress?.dateOfProgress &&
        formatWeek(moment(habit.progress?.dateOfProgress)) === thisWeek
    )
        return habit.progress.totalProgress

    return 0
}

interface GetHabitTooltipLabelProps {
    completed: boolean
    type: HabitType
    streak: number
}

export const getHabitTooltipLabel = ({
    completed,
    type,
    streak
}: GetHabitTooltipLabelProps): string => {
    if (completed && type === 'daily') {
        return 'Completed today'
    }

    if (completed && type === 'weekly') {
        return 'Completed this week'
    }

    if (!completed && type === 'daily') {
        if (streak > 0)
            return `Not completed today. Don\'t break your streak of ${streak}!`
        return 'Not completed today'
    }

    if (!completed && type === 'weekly') {
        if (streak > 0)
            return `Not completed this week. Don\'t break your streak of ${streak}!`
        return `Not completed this week`
    }

    return ''
}

export const calculateProgressOnDate = (
    progressValue: number,
    progress?: Progress
) => {
    if (!progress) return progressValue

    const isProgressFromToday = progress.dateOfProgress === today

    if (isProgressFromToday) {
        const result =
            progress.progressOnDate + (progressValue - progress.totalProgress)
        return result > 0 ? result : 0
    } else {
        const result = progressValue - progress.totalProgress
        return result > 0 ? result : 0
    }
}
