import { Goal } from '../pages/goals/types'
import { Habit } from '../pages/habits/types'

export type Doc = Goal | Habit
export interface Errors {
    nameErr: string
    form: boolean
    [k: string]: any
}
export type ErrorsDispatch = React.Dispatch<React.SetStateAction<Errors>>
