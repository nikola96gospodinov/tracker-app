type Category = 'health' | 'career' | 'financial' | 'other-personal' | 'family' | 'partner' | 'comunity' | 'other-collective'

export interface Milestone {
    name: string
    deadline?: string
}

export interface Goal {
    id: string
    name: string
    category: Category
    urlPath: string
    description?: string
    deadline?: string
    milestones?: Milestone[]
    habits?: string[]
}

export interface GoalsData {
    data: Goal[]
}
