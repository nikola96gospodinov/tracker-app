import { FunctionComponent, useContext, useMemo, useReducer } from 'react'
import { Button, useToast } from '@chakra-ui/react'

import { Todo } from '../../../types/todos.types'
import { FormModal } from '../../../components/Form/FormModal'
import { initialState, reducer } from './reducer'
import { Input } from '../../../components/Form/Input'
import { UserContext } from '../../../context/userContext'
import { TODOS } from '../../../constants/todoConstants'
import { today } from '../../../helpers/date-manipulation-functions'
import useGetDocs from '../../../hooks/useGetDocs'
import { submitTodoForm } from './helpers'

export const TodoForm: FunctionComponent<{
    isFormOpen: boolean
    onFormClose: () => void
    todo?: Todo
}> = ({ isFormOpen, onFormClose, todo }) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        title: todo?.title ?? '',
        description: todo?.description ?? '',
        deadline: todo?.deadline ?? ''
    })
    const { title, description, deadline, formError, titleError } = state

    const { docs: todos } = useGetDocs<Todo>({ path: TODOS })
    const todosPaths = useMemo(() => {
        return todos
            ?.map((todo: Todo) => todo.urlPath)
            .filter((path) => path !== todo?.urlPath)
    }, [todos, todo?.urlPath])

    const onSuccessSubmit = () => {
        onFormClose()
    }

    const onErrorSubmit = () => {
        dispatch({
            type: 'SET_FORM_ERROR',
            payload: true
        })
    }

    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()

        if (title === '') {
            dispatch({ type: 'SET_TITLE_ERROR', payload: true })
        } else {
            submitTodoForm({
                userId,
                todo,
                state,
                toast,
                todosPaths,
                onSuccess: onSuccessSubmit,
                onError: onErrorSubmit
            })
        }
    }

    const handleFormClose = () => {
        onFormClose()
        dispatch({ type: 'RESET_FORM', payload: todo })
    }

    const action = todo ? 'Edit' : 'Add a'
    const formTitle = `${action} todo`
    const btnText = `${action} Todo`
    const formErrorText =
        'There was an issue adding your todo. Please try again'

    return (
        <FormModal
            formOpen={isFormOpen}
            onFormClose={handleFormClose}
            title={formTitle}
            onSubmit={handleFormSubmit}
            isFormError={formError}
            formError={formErrorText}
        >
            <Input
                label='Title'
                name='title'
                value={title}
                type='text'
                onChange={(e) =>
                    dispatch({ type: 'SET_TITLE', payload: e.target.value })
                }
                isError={titleError}
                errorContent='Please enter a title'
            />
            <Input
                label='Description (Optional)'
                name='description'
                value={description}
                type='text'
                onChange={(e) =>
                    dispatch({
                        type: 'SET_DESCRIPTION',
                        payload: e.target.value
                    })
                }
            />
            <Input
                label='Due By (Optional)'
                name='dueBy'
                value={deadline}
                type='date'
                min={today}
                onChange={(e) =>
                    dispatch({
                        type: 'SET_DEADLINE',
                        payload: e.target.value
                    })
                }
                mb={4}
            />
            <Button type='submit'>{btnText}</Button>
        </FormModal>
    )
}
