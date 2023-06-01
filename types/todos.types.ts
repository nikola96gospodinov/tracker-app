export type TodoStatus = 'completed' | 'active'

export interface Todo {
    id: string
    title: string
    status: TodoStatus
    urlPath: string
    deadline?: string
    description?: string
    completedAt?: string
}
