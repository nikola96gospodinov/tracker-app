import { FunctionComponent, useContext } from 'react'
import { Flex, Text, useToast } from '@chakra-ui/react'

import { Todo } from '../../../../types/todos.types'
import ToggleSwitch from '../../../../components/UIElements/ToggleSwitch'
import { TODOS } from '../../../../constants/todoConstants'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { UserContext } from '../../../../context/userContext'

export const CompletedTodos: FunctionComponent<{
    todos: Todo[]
}> = ({ todos }) => {
    const { userId } = useContext(UserContext)
    const toast = useToast()

    const onChange = (id: string) => {
        submitDoc<Todo>({
            path: TODOS,
            orgDoc: {
                id: id,
                status: 'active',
                completedAt: ''
            } as Todo,
            userID: userId,
            toast,
            toastSuccessMessage: 'Todo set as active successfully',
            toastErrorMessage:
                'There was an issue setting your todo as active. Please try again'
        })
    }

    return (
        <>
            {todos.map(({ id, title }) => (
                <Flex
                    key={id}
                    bg='white'
                    p={4}
                    borderRadius='lg'
                    boxShadow='inset'
                    borderTop='solid'
                    borderTopWidth={3}
                    borderTopColor='green.500'
                    align='center'
                >
                    <ToggleSwitch
                        onChange={() => onChange(id)}
                        defaultChecked
                        size='sm'
                    />
                    <Text>{title}</Text>
                </Flex>
            ))}
        </>
    )
}
