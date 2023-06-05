import { useContext, useMemo, useReducer } from 'react'
import { useRouter } from 'next/router'
import { Button, Flex, useToast } from '@chakra-ui/react'

import useGetDocs from '../../../hooks/useGetDocs'
import { Goal } from '../../../types/goals.types'
import { GOALS } from '../../../constants/goalsConstants'
import { FormModal } from '../../../components/Form/FormModal'
import { Input } from '../../../components/Form/Input'
import { Textarea } from '../../../components/Form/Textarea'
import { UserContext } from '../../../context/userContext'
import { today } from '../../../helpers/date-manipulation-functions'
import { reducer, initialState } from './reducer'
import { submitGoalForm } from './helpers'

const GoalForm: React.FunctionComponent<{
    isFormOpen: boolean
    onFormClose: () => void
    goal?: Goal
}> = ({ isFormOpen, onFormClose, goal }) => {
    const router = useRouter()
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        name: goal?.name ?? '',
        description: goal?.description ?? '',
        deadline: goal?.deadline ?? '',
        target: goal?.target ?? undefined,
        progress: goal?.progress ?? undefined
    })
    const {
        name,
        description,
        deadline,
        target,
        progress,
        nameError,
        formError
    } = state

    const { docs: goals } = useGetDocs<Goal>({ path: GOALS })
    const goalsNames = useMemo(() => {
        return goals
            ?.map((goal: Goal) => goal.name)
            .filter((name) => name !== goal?.name)
    }, [goals, goal?.name])
    const goalPaths = useMemo(() => {
        return goals
            ?.map((goal: Goal) => goal.urlPath)
            .filter((path) => path !== goal?.urlPath)
    }, [goals, goal?.urlPath])

    const onSuccessSubmit = (urlPath: string) => {
        onFormClose()
        router.push(`/${GOALS}/${urlPath}`)
    }

    const onErrorSubmit = () => {
        dispatch({ type: 'SET_FORM_ERROR', payload: true })
    }

    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()

        const nameError = (() => {
            if (name === '') return 'Please set a name for the goal'
            if (goalsNames?.includes(name))
                return 'Name of the goal must be unique'
            return ''
        })()

        dispatch({ type: 'SET_NAME_ERROR', payload: nameError })

        if (nameError === '') {
            await submitGoalForm({
                userId,
                goal,
                state,
                onSuccessSubmit,
                onErrorSubmit,
                toast,
                goalPaths
            })
        }
    }

    const handleFormClose = () => {
        onFormClose()
        dispatch({ type: 'RESET_FORM', payload: goal })
    }

    const formTitle = goal ? 'Update goal' : 'Set a goal'
    const btnText = `${goal ? 'Update' : 'Set'} Goal`
    const formErrorText = `There was an issue ${
        goal ? 'updating' : 'setting'
    } your
    goal. Please try again`

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
                label='Name'
                name='name'
                value={name}
                type='text'
                onChange={(e) =>
                    dispatch({ type: 'SET_NAME', payload: e.target.value })
                }
                isError={nameError !== ''}
                errorContent={nameError}
            />
            <Flex gap={4}>
                <Input
                    label='Progress (Optional)'
                    name='progress'
                    value={progress ?? undefined}
                    type='number'
                    onChange={(e) =>
                        dispatch({
                            type: 'SET_PROGRESS',
                            payload: e.target.valueAsNumber
                        })
                    }
                />
                <Input
                    label='Target (Optional)'
                    name='target'
                    value={target ?? undefined}
                    type='number'
                    onChange={(e) =>
                        dispatch({
                            type: 'SET_TARGET',
                            payload: e.target.valueAsNumber
                        })
                    }
                />
            </Flex>
            <Input
                label='Deadline (Optional)'
                name='deadline'
                value={deadline}
                type='date'
                onChange={(e) =>
                    dispatch({ type: 'SET_DEADLINE', payload: e.target.value })
                }
                min={today}
                pr={3}
            />
            <Textarea
                label='Description (Optional)'
                name='description'
                value={description}
                onChange={(e) =>
                    dispatch({
                        type: 'SET_DESCRIPTION',
                        payload: e.target.value
                    })
                }
                mb={2}
            />
            <Button type='submit' width='100%'>
                {btnText}
            </Button>
        </FormModal>
    )
}

export default GoalForm
