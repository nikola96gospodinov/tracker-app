import { FunctionComponent, useContext, useReducer } from 'react'
import { Button } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

import { Todo } from '../../../types/todos.types'
import { FormModal } from '../../../components/Form/FormModal'
import { initialState, reducer } from './reducer'
import { Input } from '../../../components/Form/Input'
import { UserContext } from '../../../context/userContext'
import { TODOS } from '../../../constants/todoConstants'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { toKebabCase } from '../../../helpers/string-manipulation-functions'
import { set } from 'lodash'

export const TodoForm: FunctionComponent<{
    isFormOpen: boolean
    onFormClose: () => void
    todo?: Todo
}> = ({ isFormOpen, onFormClose, todo }) => {
    const { userId } = useContext(UserContext)
    const [{ title, description, dueBy, formError, titleError }, dispatch] =
        useReducer(reducer, {
            ...initialState,
            title: todo?.title ?? '',
            description: todo?.description ?? '',
            dueBy: todo?.dueBy ?? ''
        })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (title === '') {
            dispatch({ type: 'SET_TITLE_ERROR', payload: true })
        } else {
            submitDoc<Todo>({
                path: TODOS,
                orgDoc: {
                    id: todo?.id ?? uuidv4(),
                    urlPath: todo?.urlPath ?? toKebabCase(title) ?? '',
                    title,
                    description,
                    dueBy,
                    status: todo?.status ?? 'active'
                },
                userID: userId,
                setDocsFormOpen: onFormClose,
                reducerAction: () =>
                    dispatch({
                        type: 'SET_FORM_ERROR',
                        payload: true
                    })
            })
        }
    }

    const action = todo ? 'Edit' : 'Add a'
    const formTitle = `${action} todo`
    const btnText = `${action} Todo`
    const formErrorText =
        'There was an issue adding your todo. Please try again'

    return (
        <FormModal
            formOpen={isFormOpen}
            onFormClose={onFormClose}
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
                value={dueBy}
                type='date'
                onChange={(e) =>
                    dispatch({
                        type: 'SET_DESCRIPTION',
                        payload: e.target.value
                    })
                }
                mb={4}
            />
            <Button type='submit'>{btnText}</Button>
        </FormModal>
    )
}
