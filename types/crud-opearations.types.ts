import { Goal } from './goals.types'
import { Habit } from './habits.types'
import { Dispatch } from '../typings'
import { Todo } from './todos.types'

export type Doc = Goal | Habit | Todo
export interface Errors {
    nameErr: string
    form: boolean
    [k: string]: any
}
export type ErrorsDispatch = Dispatch<Errors>
