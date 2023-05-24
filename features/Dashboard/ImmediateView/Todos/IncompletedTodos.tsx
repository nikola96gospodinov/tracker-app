import { FunctionComponent } from 'react'
import { Todo } from '../../../../types/todos.types'
import { TodoBox } from '../../../Todos/TodosList/TodoBox'

export const IncompletedTodos: FunctionComponent<{
    todos: Todo[]
}> = ({ todos }) => {
    return (
        <>
            {todos.map((todo) => (
                <TodoBox key={todo.id} todo={todo} />
            ))}
        </>
    )
}
