export type HabitType = 'daily' | 'weekly'

interface Streak {
    streak: number
    start?: string | null
    end?: string | null
}

export interface Habit {
    id: string
    name: string
    type: HabitType
    target: number
    metric: string
    longestStreak: Streak
    currentStreak: Streak
    urlPath: string
    description?: string
}
