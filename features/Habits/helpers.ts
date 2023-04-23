import moment from 'moment'
import { collection, doc, updateDoc } from 'firebase/firestore'

import {
    formatDate,
    formatDateForUI,
    formatWeek,
    goOneDayBack,
    goOneDayForward
} from '../../helpers/date-manipulation-functions'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { HABITS } from './constants'
import { Habit, HabitType, Progress, Streak } from './habits.types'
import { db } from '../../firebase/firebase'
import { GOALS } from '../Goals/constants'
import { Goal } from './../Goals/goals.types'
import CheckIcon from '../../components/Icons/CheckIcon'
import DangerIcon from '../../components/Icons/DangerIcon'

const today = formatDate(moment())
const yesterday = formatDate(moment().subtract(1, 'days'))
const thisWeek = formatWeek(moment())
const lastWeek = formatWeek(moment().subtract(7, 'days'))

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
                    end: newStreak?.lastEnd,
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

export const getUpdatedStreaksForWeeklyHabits = (habit: Habit) => {
    const longestStreak = habit.longestStreak
    const currentStreak = habit.currentStreak
    const completedThisWeek =
        habit.progress?.progress === habit.target &&
        formatWeek(moment(habit.progress.dateOfProgress)) === thisWeek
    const completedLastWeek = habit.currentStreak?.end === lastWeek

    let newStreak = { ...currentStreak }

    if (completedLastWeek) {
        if (completedThisWeek) {
            newStreak = {
                streak: --newStreak.streak,
                start: newStreak?.start,
                end: lastWeek
            }
        } else {
            newStreak = {
                streak: ++newStreak.streak,
                start: newStreak?.start,
                end: thisWeek
            }
        }
    } else {
        if (completedThisWeek) {
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
        } else {
            newStreak = {
                streak: 1,
                start: thisWeek,
                end: thisWeek,
                lastEnd: newStreak?.end || null
            }
        }
    }

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

export const getHabitCompletionIcon = (completedToday: boolean) =>
    completedToday ? CheckIcon : DangerIcon

export const getLastCompletedFormatted = (
    lastCompleted: string | undefined | null
): string => {
    const daysAgo = Math.abs(moment(lastCompleted).diff(today, 'days'))

    if (daysAgo === 0 && lastCompleted) return 'Today'
    if (daysAgo === 1) return 'Yesterday'
    if (daysAgo > 1) return `${daysAgo} days ago`

    return 'Never'
}

interface ToggleHabitCompletionProps {
    habit: Habit
    completedToday: boolean
    userID: string | undefined
}

export const toggleHabitCompletion = ({
    habit,
    completedToday,
    userID
}: ToggleHabitCompletionProps): (() => void) => {
    return () => {
        const updatedStreaks =
            habit.type === 'daily'
                ? getUpdatedStreaksForDailyHabits(habit, completedToday)
                : getUpdatedStreaksForWeeklyHabits(habit)

        submitDoc<Habit>({
            path: HABITS,
            userID: userID ?? '',
            orgDoc: {
                id: habit.id,
                ...updatedStreaks
            } as Habit
        })
    }
}

interface UpdateHabitProgressProps {
    habit: Habit
    userID: string
    progress: Progress
    completed: boolean
}

export const updateHabitProgress = ({
    habit,
    userID,
    progress,
    completed
}: UpdateHabitProgressProps) => {
    const updatedStreaks =
        habit.type === 'daily'
            ? getUpdatedStreaksForDailyHabits(habit, !completed)
            : getUpdatedStreaksForWeeklyHabits(habit)

    submitDoc<Habit>({
        path: HABITS,
        userID: userID ?? '',
        orgDoc: {
            id: habit.id,
            progress,
            ...updatedStreaks
        } as Habit
    })
}

interface RemoveHabitFromGoalsOnDeleteProps {
    userID: string
    relevantGoals: Goal[] | undefined
    habitID: string
}

export const removeHabitFromGoalsOnDelete = async ({
    userID,
    relevantGoals,
    habitID
}: RemoveHabitFromGoalsOnDeleteProps) => {
    const fullPath = `users/${userID}/${GOALS}`
    const docsCollection = collection(db, fullPath)

    for (const goal of relevantGoals ?? []) {
        const docsRef = doc(docsCollection, goal.id)
        try {
            await updateDoc(docsRef, {
                dailyHabits: goal.dailyHabits?.filter(
                    (habit) => habit !== habitID
                ),
                weeklyHabits: goal.weeklyHabits?.filter(
                    (habit) => habit !== habitID
                )
            })
        } catch (e) {
            console.log(e)
        }
    }
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
            return `(${formatDateForUI(
                longestStreak.start
            )} - ${formatDateForUI(longestStreak.end)})`
        else return `(${longestStreak.start} - ${longestStreak.end})`

    return ''
}

export const getCurrentProgress = (progress?: Progress): number => {
    if (progress?.dateOfProgress === today) return progress.progress
    return 0
}
