import { v4 as uuidv4 } from 'uuid'

import { TODOS } from '../../../constants/todoConstants'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { getUrlPath } from '../../../helpers/string-manipulation-functions'
import { Todo } from '../../../types/todos.types'
import { initialState } from './reducer'

interface SubmitTodoFormProps {
    state: typeof initialState
    todo?: Todo
    userId?: string
    todosPaths?: string[]
    toast?: any
    onSuccess?: () => void
    onError?: () => void
}

export const submitTodoForm = async ({
    state,
    todo,
    userId,
    todosPaths,
    toast,
    onSuccess,
    onError
}: SubmitTodoFormProps): Promise<void> => {
    const { title, description, deadline } = state

    await submitDoc<Todo>({
        path: TODOS,
        orgDoc: {
            id: todo?.id ?? uuidv4(),
            urlPath: getUrlPath({ name: title, paths: todosPaths }),
            title,
            description,
            deadline,
            status: todo?.status ?? 'active'
        },
        userID: userId,
        toast,
        toastSuccessMessage: `Todo ${
            todo?.id ? 'updated' : 'added'
        } successfully`,
        toastErrorMessage: `There was an issue ${
            todo?.id ? 'updating' : 'adding'
        } your todo. Please try again`,
        onSuccess,
        onError
    })
}
