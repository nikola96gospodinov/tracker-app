import { FunctionComponent, useContext } from 'react'
import {
    Flex,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack
} from '@chakra-ui/react'

import { Todo } from '../../../types/todos.types'
import { Deadline } from '../../Deadline'
import ToggleSwitch from '../../../components/UIElements/ToggleSwitch'
import { TODOS } from '../../../constants/todoConstants'
import { UserContext } from '../../../context/userContext'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import GearIcon from '../../../components/Icons/GearIcon'
import { TodoActions } from './TodoActions'

export const TodoBox: FunctionComponent<{
    todo: Todo
}> = ({ todo }) => {
    const { userId } = useContext(UserContext)
    const isCompleted = todo.status === 'completed'
    const toggleText = isCompleted ? 'Completed 🥳' : 'Set as completed'

    const onToggleChange = () => {
        submitDoc<Todo>({
            path: TODOS,
            orgDoc: {
                id: todo.id,
                status: isCompleted ? 'active' : 'completed'
            } as Todo,
            userID: userId
        })
    }

    return (
        <VStack
            align='flex-start'
            bg='white'
            p={6}
            boxShadow='inset'
            borderRadius='2xl'
            justify='space-between'
        >
            <VStack align='flex-start' w='100%'>
                <Flex w='100%' justify='space-between'>
                    <Heading as='h3' fontSize='lg'>
                        {todo.title}
                    </Heading>
                    <TodoActions todo={todo} />
                </Flex>
                <Text>{todo.description}</Text>
            </VStack>
            <Flex gap={4} pt={4}>
                {!isCompleted && (
                    <Deadline deadline={todo.dueBy} isCompleted={isCompleted} />
                )}
                <ToggleSwitch
                    text={toggleText}
                    onChange={onToggleChange}
                    isChecked={isCompleted}
                    size='sm'
                />
            </Flex>
        </VStack>
    )
}
