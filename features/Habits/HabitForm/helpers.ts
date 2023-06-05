import { v4 as uuidv4 } from 'uuid'

import { getUrlPath } from '../../../helpers/string-manipulation-functions'
import { Habit } from '../../../types/habits.types'
import { initialState } from './reducer'
import { HABITS } from '../../../constants/habitsConstants'
import { submitDoc } from './../../../helpers/crud-operations/crud-operations-main-docs'

interface SubmitHabitFormProps {
    state: typeof initialState
    habit?: Habit
    habitsPaths?: string[]
    userId?: string
    onSuccessSubmit: (urlPath: string) => void
    onErrorSubmit: () => void
    toast?: any
}

export const submitHabitForm = async ({
    habit,
    state,
    habitsPaths,
    userId,
    onSuccessSubmit,
    onErrorSubmit,
    toast
}: SubmitHabitFormProps): Promise<void> => {
    const { name, description, type, target = 1, metric } = state

    const urlPath = getUrlPath({ name, paths: habitsPaths })
    const fields = {
        id: habit?.id ?? uuidv4(),
        name,
        description,
        type,
        target,
        metric,
        urlPath,
        longestStreak: habit?.longestStreak ?? {
            streak: 0
        },
        currentStreak: habit?.currentStreak ?? {
            streak: 0
        }
    }

    await submitDoc<Habit>({
        path: HABITS,
        orgDoc: fields,
        userID: userId,
        onSuccess: () => onSuccessSubmit(urlPath),
        onError: onErrorSubmit,
        toast,
        toastSuccessMessage: `Habit successfully ${habit ? 'edited' : 'added'}`,
        toastErrorMessage: `There was an issue ${
            habit ? 'editing' : 'adding'
        } your habit. Please try again`
    })
}
