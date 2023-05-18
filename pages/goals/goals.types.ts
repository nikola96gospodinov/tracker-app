import { Dispatch } from '../../typings'

export interface Milestone {
    id: string
    goalID: string
    name: string
    completed: boolean
    deadline?: string
    target?: number
    progress?: number
}

export interface Goal {
    id: string
    name: string
    urlPath: string
    description?: string
    deadline?: string
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
    type?: 'daily' | 'weekly'
}
