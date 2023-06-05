import { Goal } from '../../../types/goals.types'

type ActionType =
    | {
          type:
              | 'SET_NAME'
              | 'SET_DESCRIPTION'
              | 'SET_DEADLINE'
              | 'SET_NAME_ERROR'
          payload: string
      }
    | {
          type: 'SET_TARGET' | 'SET_PROGRESS'
          payload: number
      }
    | {
          type: 'SET_FORM_ERROR'
          payload: boolean
      }
    | {
          type: 'RESET_FORM'
          payload?: Goal
      }

interface InitialStateType {
    name: string
    description: string
    deadline: string
    target?: number
    progress?: number
    nameError: string
    formError: boolean
}

export const initialState: InitialStateType = {
    name: '',
    description: '',
    deadline: '',
    target: undefined,
    progress: undefined,
    nameError: '',
    formError: false
}

export const reducer = (
    state: typeof initialState,
    action: ActionType
): typeof initialState => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
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
        case 'SET_TARGET':
            return {
                ...state,
                target: action.payload
            }
        case 'SET_PROGRESS':
            return {
                ...state,
                progress: action.payload
            }
        case 'SET_NAME_ERROR':
            return {
                ...state,
                nameError: action.payload
            }
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.payload
            }
        case 'RESET_FORM':
            const activeGoal = action.payload
            return {
                ...initialState,
                name: activeGoal?.name ?? '',
                description: activeGoal?.description ?? '',
                progress: activeGoal?.progress ?? undefined,
                target: activeGoal?.target ?? undefined,
                deadline: activeGoal?.deadline ?? ''
            }
        default:
            return state
    }
}
