import { Goal } from '../features/Goals/goals.types'
import { Habit } from '../features/Habits/habits.types'
import { Dispatch } from '../typings'

export type Doc = Goal | Habit
export interface Errors {
    nameErr: string
    form: boolean
    [k: string]: any
}
export type ErrorsDispatch = Dispatch<Errors>
