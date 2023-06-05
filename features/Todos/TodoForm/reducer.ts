import { v4 as uuidv4 } from 'uuid'

import { TODOS } from '../../../constants/todoConstants'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { getUrlPath } from '../../../helpers/string-manipulation-functions'
import { Todo } from '../../../types/todos.types'

type ActionType =
    | {
          type: 'SET_TITLE' | 'SET_DESCRIPTION' | 'SET_DEADLINE'
          payload: string
      }
    | {
          type: 'SET_FORM_ERROR' | 'SET_TITLE_ERROR'
          payload: boolean
      }
    | {
          type: 'RESET_FORM'
          payload?: Todo
      }
    | {
          type: 'SUBMIT_FORM'
          payload: {
              userId: string
              todosPaths?: string[]
              todo?: Todo
              toast?: any
              onSuccess?: () => void
              onError?: () => void
          }
      }

export const initialState = {
    title: '',
    description: '',
    deadline: '',
    formError: false,
    titleError: false
}

export const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.payload
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload
            }
        case 'SET_DEADLINE':
            return {
                ...state,
                deadline: action.payload
            }
        case 'SET_TITLE_ERROR':
            return {
                ...state,
                titleError: action.payload
            }
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.payload
            }
        case 'RESET_FORM':
            const activeTodo = action.payload
            return {
                ...initialState,
                title: activeTodo?.title ?? '',
                description: activeTodo?.description ?? '',
                deadline: activeTodo?.deadline ?? ''
            }
        case 'SUBMIT_FORM':
            const { todo, todosPaths, userId, onSuccess, onError } =
                action.payload
            const { title, description, deadline } = state

            submitDoc<Todo>({
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
                toastSuccessMessage: `Todo ${
                    todo?.id ? 'updated' : 'added'
                } successfully`,
                toastErrorMessage: `There was an issue ${
                    todo?.id ? 'updating' : 'adding'
                } your todo. Please try again`,
                onSuccess,
                onError
            })
            return initialState
        default:
            return state
    }
}
