import { MenuItem } from '@chakra-ui/react'

export const ImmediateViewMenuItems: React.FunctionComponent<{
    onOpenHabitList: () => void
    onOpenAddTodo: () => void
}> = ({ onOpenAddTodo, onOpenHabitList }) => (
    <>
        <MenuItem onClick={onOpenHabitList}>Manage active habits</MenuItem>
        <MenuItem onClick={onOpenAddTodo}>Add a todo</MenuItem>
    </>
)
