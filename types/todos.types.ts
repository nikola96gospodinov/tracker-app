export type TodoStatus = 'completed' | 'active'

export interface Todo {
    id: string
    title: string
    status: TodoStatus
    urlPath: string
    dueBy?: string
    description?: string
    completedAt?: string
}
