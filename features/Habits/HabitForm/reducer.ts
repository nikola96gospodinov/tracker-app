import { Habit, HabitType } from '../../../types/habits.types'

type ActionType =
    | {
          type: 'SET_NAME' | 'SET_DESCRIPTION' | 'SET_METRIC' | 'SET_NAME_ERROR'
          payload: string
      }
    | {
          type: 'SET_TARGET'
          payload: number
      }
    | {
          type: 'SET_TYPE'
          payload: HabitType
      }
    | {
          type: 'SET_FORM_ERROR' | 'SET_TARGET_ERROR' | 'SET_METRIC_ERROR'
          payload: boolean
      }
    | {
          type: 'RESET_FORM'
          payload?: Habit
      }

interface InitialStateType {
    name: string
    description: string
    type: HabitType
    metric: string
    target?: number
    nameError: string
    targetError: boolean
    metricError: boolean
    formError: boolean
}

export const initialState: InitialStateType = {
    name: '',
    description: '',
    type: 'daily',
    metric: '',
    target: undefined,
    nameError: '',
    targetError: false,
    metricError: false,
    formError: false
}

export const reducer = (state: typeof initialState, action: ActionType) => {
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
        case 'SET_METRIC':
            return {
                ...state,
                metric: action.payload
            }
        case 'SET_TARGET':
            return {
                ...state,
                target: action.payload
            }
        case 'SET_TYPE':
            return {
                ...state,
                type: action.payload
            }
        case 'SET_NAME_ERROR':
            return {
                ...state,
                nameError: action.payload
            }
        case 'SET_TARGET_ERROR':
            return {
                ...state,
                targetError: action.payload
            }
        case 'SET_METRIC_ERROR':
            return {
                ...state,
                metricError: action.payload
            }
        case 'SET_FORM_ERROR':
            return {
                ...state,
                formError: action.payload
            }
        case 'RESET_FORM':
            const activeHabit = action.payload
            return {
                ...initialState,
                name: activeHabit?.name ?? '',
                description: activeHabit?.description ?? '',
                type: activeHabit?.type ?? 'daily',
                metric: activeHabit?.metric ?? '',
                target: activeHabit?.target
            }
        default:
            return state
    }
}
