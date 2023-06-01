import { FunctionComponent, useContext } from 'react'
import { Flex, Heading, Text, VStack, useToast } from '@chakra-ui/react'

import { Todo } from '../../../types/todos.types'
import { Deadline } from '../../Deadline'
import ToggleSwitch from '../../../components/UIElements/ToggleSwitch'
import { TODOS } from '../../../constants/todoConstants'
import { UserContext } from '../../../context/userContext'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { TodoActions } from './TodoActions'
import { today } from '../../../helpers/date-manipulation-functions'

export const TodoBox: FunctionComponent<{
    todo: Todo
}> = ({ todo }) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const isCompleted = todo.status === 'completed'
    const toggleText = isCompleted ? 'Completed 🥳' : 'Done?'

    const onToggleChange = () => {
        submitDoc<Todo>({
            path: TODOS,
            orgDoc: {
                id: todo.id,
                status: isCompleted ? 'active' : 'completed',
                completedAt: isCompleted ? '' : today
            } as Todo,
            userID: userId,
            toast: toast,
            toastSuccessMessage: `Todo set as ${
                isCompleted ? 'active' : 'completed'
            } successfully`,
            toastErrorMessage: `There was an issue setting your todo as ${
                isCompleted ? 'active' : 'completed'
            }. Please try again`
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
            <Flex gap={6} pt={4}>
                {!isCompleted && (
                    <Deadline
                        deadline={todo.deadline}
                        isCompleted={isCompleted}
                        gap={1.5}
                    />
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
