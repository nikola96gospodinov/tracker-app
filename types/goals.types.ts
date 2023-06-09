import { Dispatch } from '../typings'
import { HabitType } from './habits.types'

export type GoalStatus = 'active' | 'completed' | 'archived'

export interface Milestone {
    id: string
    goalID: string
    name: string
    completed: boolean
    deadline?: string
    target?: number
    progress?: number
    completedOn?: string
}

export interface Goal {
    id: string
    name: string
    urlPath: string
    status: GoalStatus
    description?: string
    deadline?: string
    completedOn?: string
    progress?: number | null
    target?: number | null
    dailyHabits?: string[]
    weeklyHabits?: string[]
}

export interface TabElementProps {
    goalID: string
    shortName: string
    newElementAdded: boolean
    setNewElementAdded: Dispatch<boolean>
    activeTab: string
    goal?: Goal
    type?: HabitType
}
