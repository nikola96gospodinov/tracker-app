import { collection, updateDoc, doc } from 'firebase/firestore'

import { GOALS } from '../../../constants/goalsConstants'
import { HABITS } from '../../../constants/habitsConstants'
import { db } from '../../../firebase/firebase'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { Goal } from '../../../types/goals.types'
import { Habit, Progress } from '../../../types/habits.types'
import {
    getUpdatedStreaksForDailyHabits,
    getUpdatedStreaksForWeeklyHabits
} from './helpers'
import { today } from '../../../helpers/date-manipulation-functions'

interface OnKeystoneStatusChangeProps {
    userId: string | undefined
    habitId: string
    isKeystone: boolean | undefined
    toast?: any
}

export const onKeystoneStatusChange = ({
    userId,
    habitId,
    isKeystone,
    toast
}: OnKeystoneStatusChangeProps) => {
    submitDoc<Habit>({
        path: HABITS,
        userID: userId,
        orgDoc: {
            id: habitId,
            isKeystone: !Boolean(isKeystone)
        } as Habit,
        toast,
        toastSuccessMessage: 'Habit keystone status successfully updated!',
        toastErrorMessage:
            'There was an error updating the keystone status. Please try again'
    })
}

interface RemoveHabitFromGoalsOnDeleteProps {
    userID: string | undefined
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

interface UpdateHabitProgressProps {
    habit: Habit
    userID: string
    progress: Progress
    completed: boolean
    toast?: any
}

export const updateHabitProgress = ({
    habit,
    userID,
    progress,
    completed,
    toast
}: UpdateHabitProgressProps) => {
    const updatedStreaks =
        habit.type === 'daily'
            ? getUpdatedStreaksForDailyHabits(habit, !completed)
            : getUpdatedStreaksForWeeklyHabits(habit, progress)

    submitDoc<Habit>({
        path: HABITS,
        userID: userID ?? '',
        orgDoc: {
            id: habit.id,
            progress,
            ...updatedStreaks
        } as Habit,
        toast,
        toastSuccessMessage: 'Habit progress successfully updated!',
        toastErrorMessage:
            'There was an error updating the habit progress. Please try again'
    })
}

interface ToggleHabitCompletionProps {
    habit: Habit
    completedToday: boolean
    userID: string | undefined
    toast?: any
}

export const toggleHabitCompletion = ({
    habit,
    completedToday,
    userID,
    toast
}: ToggleHabitCompletionProps) => {
    const updatedStreaks =
        habit.type === 'daily'
            ? getUpdatedStreaksForDailyHabits(habit, completedToday)
            : getUpdatedStreaksForWeeklyHabits(habit, {
                  totalProgress: completedToday ? 0 : 1,
                  dateOfProgress: completedToday ? today : undefined,
                  progressOnDate: completedToday ? 0 : 1
              })

    submitDoc<Habit>({
        path: HABITS,
        userID: userID ?? '',
        orgDoc: {
            id: habit.id,
            ...updatedStreaks
        } as Habit,
        toast,
        toastSuccessMessage: 'Habit progress successfully updated!',
        toastErrorMessage:
            'There was an error updating the habit progress. Please try again'
    })
}
