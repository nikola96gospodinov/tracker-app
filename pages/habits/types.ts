export type HabitType = 'daily' | 'weekly'

export interface Habit {
    id: string
    name: string
    type: HabitType
    target: number
    metric: string
    longestStreak: number
    currentStreak: number
    urlPath: string
    description?: string
    attachedGoals?: string[]
    lastCompleted?: string
}
