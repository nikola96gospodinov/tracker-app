export type HabitType = 'daily' | 'weekly'

export interface Streak {
    streak: number
    start?: string | null
    end?: string | null
    lastEnd?: string | null
}

export interface Habit {
    id: string
    name: string
    type: HabitType
    target: number
    progress?: number
    metric: string
    longestStreak: Streak
    currentStreak: Streak
    urlPath: string
    description?: string
}
