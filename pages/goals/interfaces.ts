type Category = 'health' | 'career' | 'financial' | 'other-personal' | 'family' | 'partner' | 'comunity' | 'other-collective'

export interface Milestone {
    name: string
    deadline?: string
}

export interface Goal {
    id: string
    name: string
    category: Category
    description?: string
    deadline?: string
    milestones?: Milestone[]
    habits?: string[]
}

export interface AllGoals {
    activeGoals: Goal[]
    achievedGoals: Goal[]
    archivedGoals: Goal[]
}