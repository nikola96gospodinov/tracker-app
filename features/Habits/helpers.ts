import moment from 'moment'
import { collection, doc, updateDoc } from 'firebase/firestore'

import {
    formatDate,
    formatDateForUI,
    goOneDayBack,
    goOneDayForward
} from '../../helpers/date-manipulation-functions'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { HABITS } from './constants'
import { Habit, Progress, Streak } from './habits.types'
import { db } from '../../firebase/firebase'
import { GOALS } from '../Goals/constants'
import { Goal } from './../Goals/goals.types'
import CheckIcon from '../../components/Icons/CheckIcon'
import DangerIcon from '../../components/Icons/DangerIcon'

const today = formatDate(moment())

export const getUpdatedStreaks = (habit: Habit, completedToday: boolean) => {
    const longestStreak = habit.longestStreak
    const currentStreak = habit.currentStreak
    const completedYesterday =
        habit.currentStreak?.end === formatDate(moment().subtract(1, 'days'))

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

interface GetCurrentStreakProps {
    lastCompletedDate: string | undefined | null
    currentStreak: number
}

export const getCurrentStreak = ({
    lastCompletedDate,
    currentStreak
}: GetCurrentStreakProps): number => {
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
        const updatedStreaks = getUpdatedStreaks(habit, completedToday)
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
    const updatedStreaks = getUpdatedStreaks(habit, !completed)
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

export const getLongestStreakRange = (longestStreak: Streak): string => {
    if (
        longestStreak.start &&
        longestStreak.end &&
        longestStreak.start !== longestStreak.end
    )
        return `(${formatDateForUI(longestStreak.start)} - ${formatDateForUI(
            longestStreak.end
        )})`

    return ''
}

export const getCurrentProgress = (progress?: Progress): number => {
    if (progress?.dateOfProgress === today) return progress.progress
    return 0
}
