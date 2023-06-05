import { v4 as uuidv4 } from 'uuid'

import { GOALS } from '../../../constants/goalsConstants'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { today } from '../../../helpers/date-manipulation-functions'
import { getUrlPath } from '../../../helpers/string-manipulation-functions'
import { Goal } from '../../../types/goals.types'
import { initialState } from './reducer'

interface SubmitGoalFormProps {
    goal?: Goal
    state: typeof initialState
    userId?: string
    goalPaths?: string[]
    onSuccessSubmit: (urlPath: string) => void
    onErrorSubmit: () => void
    toast: any
}

export const submitGoalForm = async ({
    goal,
    state,
    userId,
    goalPaths,
    onSuccessSubmit,
    onErrorSubmit,
    toast
}: SubmitGoalFormProps): Promise<void> => {
    const { name, description, deadline, target, progress } = state
    const isCompleted = progress && target && progress >= target
    const urlPath = getUrlPath({ name, paths: goalPaths })
    const fields = {
        id: goal?.id ?? uuidv4(),
        name,
        description,
        deadline,
        target: target ?? null,
        progress: progress ?? null,
        status: isCompleted ? 'completed' : goal?.status ?? 'active',
        completedOn: isCompleted ? today : '',
        urlPath
    }

    await submitDoc<Goal>({
        path: GOALS,
        orgDoc: fields as Goal,
        userID: userId,
        onSuccess: () => onSuccessSubmit(urlPath),
        onError: onErrorSubmit,
        toast,
        toastSuccessMessage: `Goal ${
            goal?.id ? 'updated' : 'set'
        } successfully`,
        toastErrorMessage: `There was an issue ${
            goal?.id ? 'updating' : 'setting'
        } your goal. Please try again.`
    })
}
