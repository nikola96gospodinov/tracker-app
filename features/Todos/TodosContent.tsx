import { FunctionComponent, useState } from 'react'
import InitialSection from '../../components/InitialSection'
import { DocHeader } from '../../components/Docs/DocHeader'
import { useDisclosure } from '@chakra-ui/react'
import { filteringOptions } from './data'
import TodosList from './TodosList/TodosList'
import { TodoForm } from './TodoForm/TodoForm'

export const TodosContent: FunctionComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialValue = filteringOptions[1].value
    const [activeOptionValue, setActiveOptionValue] = useState(initialValue)

    return (
        <InitialSection>
            <DocHeader
                heading='My Todos'
                onClick={onOpen}
                filteringOptions={filteringOptions}
                activeOptionValue={activeOptionValue}
                setActiveOptionValue={setActiveOptionValue}
            />
            <TodosList
                activeOptionValue={activeOptionValue}
                onAddTodosFormOpen={onOpen}
            />
            <TodoForm isFormOpen={isOpen} onFormClose={onClose} />
        </InitialSection>
    )
}
