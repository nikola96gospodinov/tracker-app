type Category = 'health' | 'career' | 'financial' | 'other-personal' | 'family' | 'partner' | 'comunity' | 'other-collective'

export interface Milestone {
    id: string
    goalID: string
    name: string
    completed: boolean
    deadline?: string
}

export interface Goal {
    id: string
    name: string
    category: Category
    urlPath: string
    description?: string
    deadline?: string
    habits?: string[]
    targets?: string[]
}
