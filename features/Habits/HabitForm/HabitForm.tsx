import React, { useContext, useMemo, useReducer } from 'react'
import { useRouter } from 'next/router'
import { Button, useToast } from '@chakra-ui/react'

import useGetDocs from '../../../hooks/useGetDocs'
import { HABITS } from '../../../constants/habitsConstants'
import { Habit, HabitType } from '../../../types/habits.types'
import { FormModal } from '../../../components/Form/FormModal'
import { Input } from '../../../components/Form/Input'
import { RadioGroup } from '../../../components/Form/RadioGroup'
import { habitTypes } from '../data'
import { UserContext } from '../../../context/userContext'
import { reducer, initialState } from './reducer'
import { submitHabitForm } from './helpers'

const HabitForm: React.FunctionComponent<{
    isFormOpen: boolean
    onFormClose: () => void
    habit?: Habit
}> = ({ isFormOpen, onFormClose, habit }) => {
    const toast = useToast()
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        name: habit?.name ?? '',
        description: habit?.description ?? '',
        type: habit?.type ?? 'daily',
        metric: habit?.metric ?? '',
        target: habit?.target
    })
    const {
        name,
        description,
        type,
        metric,
        target,
        formError,
        nameError,
        metricError,
        targetError
    } = state

    const { docs: habits } = useGetDocs<Habit>({ path: HABITS })
    const habitsNames = useMemo(() => {
        return habits
            ?.map((habit: Habit) => habit.name)
            .filter((name) => name !== habit?.name)
    }, [habit?.name, habits])
    const habitsPaths = useMemo(() => {
        return habits
            ?.map((habit: Habit) => habit.urlPath)
            .filter((path) => path !== habit?.urlPath)
    }, [habit?.urlPath, habits])

    const handleRadioChange = (val: string): void => {
        dispatch({ type: 'SET_TYPE', payload: val as HabitType })
    }

    const onSuccessSubmit = (urlPath: string) => {
        onFormClose()
        router.push(`/${HABITS}/${urlPath}`)
    }

    const onErrorSubmit = () => {
        dispatch({ type: 'SET_FORM_ERROR', payload: true })
    }

    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()

        const nameError = (() => {
            if (name === '') return 'Please set a name for the habit'
            if (habitsNames?.includes(name))
                return 'Name of the habit must be unique'
            return ''
        })()

        dispatch({ type: 'SET_NAME_ERROR', payload: nameError })
        dispatch({ type: 'SET_TARGET_ERROR', payload: !Boolean(target) })
        dispatch({ type: 'SET_METRIC_ERROR', payload: !Boolean(metric) })

        if (target && metric && nameError === '') {
            await submitHabitForm({
                state,
                userId,
                habitsPaths,
                habit,
                toast,
                onSuccessSubmit: (urlPath: string) => onSuccessSubmit(urlPath),
                onErrorSubmit
            })
        }
    }

    const handleFormClose = () => {
        dispatch({ type: 'RESET_FORM', payload: habit })
        onFormClose()
    }

    const action = habit ? 'Edit' : 'Add a'
    const title = `${action} habit`
    const btnText = `${action} Habit`
    const formErrorText =
        'There was an issue adding your habit. Please try again'

    return (
        <FormModal
            formOpen={isFormOpen}
            onFormClose={handleFormClose}
            title={title}
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
            <RadioGroup
                options={habitTypes}
                currentValue={type}
                onChange={handleRadioChange}
                name='type'
                description='Measured:'
            />
            <Input
                label='Target'
                name='target'
                value={target}
                type='number'
                onChange={(e) =>
                    dispatch({
                        type: 'SET_TARGET',
                        payload: e.target.valueAsNumber
                    })
                }
                min={1}
                isError={targetError}
                errorContent='Please select a target'
            />
            <Input
                label='Metric'
                name='metric'
                value={metric}
                type='text'
                onChange={(e) =>
                    dispatch({ type: 'SET_METRIC', payload: e.target.value })
                }
                isError={metricError}
                errorContent='Please select a metric'
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
                mb={4}
            />
            <Button type='submit'>{btnText}</Button>
        </FormModal>
    )
}

export default HabitForm
