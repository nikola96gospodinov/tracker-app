import { Goal } from '../pages/goals/interfaces'
import { Habit } from '../pages/habits/interfaces'

export type Doc = Goal | Habit
export interface Errors {
    nameErr: string
    form: boolean
    [k: string]: any
}
export type ErrorsDispatch = React.Dispatch<React.SetStateAction<Errors>>
