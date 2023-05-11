import React, { useContext, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'

import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { toKebabCase } from '../../../helpers/string-manipulation-functions'
import useGetDocs from '../../../hooks/useGetDocs'
import { ErrorsDispatch } from '../../../types/crud-opearations.types'
import { HABITS } from '../constants'
import { Habit, HabitType } from '../habits.types'
import { FormModal } from '../../../components/Form/FormModal'
import { Input } from '../../../components/Form/Input'
import { RadioGroup } from '../../../components/Form/RadioGroup'
import { habitTypes } from '../data'
import { UserContext } from '../../../context/userContext'

const HabitForm: React.FunctionComponent<{
    isFormOpen: boolean
    onFormClose: () => void
    habit?: Habit
}> = ({ isFormOpen, onFormClose, habit }) => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const [name, setName] = useState(habit?.name ?? '')
    const [description, setDescription] = useState(habit?.description ?? '')
    const [type, setType] = useState(habit?.type ?? 'daily')
    const [target, setTarget] = useState(habit?.target)
    const [metric, setMetric] = useState(habit?.metric ?? '')
    const [errors, setErrors] = useState({
        nameErr: '',
        targetErr: false,
        metricErr: false,
        form: false
    })

    const { docs: habits } = useGetDocs<Habit>({ userID: userId, path: HABITS })
    const habitsNames = useMemo(() => {
        return habits
            ?.map((habit: Habit) => habit.name)
            .filter((name) => name !== habit?.name)
    }, [habit?.name, habits])

    const handleRadioChange = (val: string): void => {
        setType(val as HabitType)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const nameError = () => {
            if (name === '') return 'Please set a name for the habit'
            if (habitsNames?.includes(name))
                return 'Name of the habit must be unique'
            return ''
        }

        setErrors({
            ...errors,
            nameErr: nameError(),
            targetErr: !Boolean(target),
            metricErr: !Boolean(metric)
        })

        if (target && metric && nameError() === '') {
            const fields = {
                id: habit?.id ?? uuidv4(),
                name,
                description,
                type,
                target,
                metric,
                urlPath: toKebabCase(name) as string,
                longestStreak: habit?.longestStreak ?? {
                    streak: 0
                },
                currentStreak: habit?.currentStreak ?? {
                    streak: 0
                }
            }

            submitDoc<Habit>({
                path: HABITS,
                orgDoc: fields,
                userID: userId,
                setDocsFormOpen: onFormClose,
                setErrors: setErrors as ErrorsDispatch,
                router
            })
        }
    }

    const action = habit ? 'Edit' : 'Add a'
    const title = `${action} habit`
    const nameErr = errors.nameErr !== ''
    const btnText = `${action} Habit`
    const formErrorText =
        'There was an issue adding your habit. Please try again'

    return (
        <FormModal
            formOpen={isFormOpen}
            onFormClose={onFormClose}
            title={title}
            onSubmit={handleFormSubmit}
            isFormError={errors.form}
            formError={formErrorText}
        >
            <Input
                label='Name'
                name='name'
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                isError={nameErr}
                errorContent={errors.nameErr}
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
                onChange={(e) => setTarget(+e.target.value)}
                min={1}
                isError={errors.targetErr}
                errorContent='Please select a target'
            />
            <Input
                label='Metric'
                name='metric'
                value={metric}
                type='text'
                onChange={(e) => setMetric(e.target.value)}
                isError={errors.metricErr}
                errorContent='Please select a metric'
            />
            <Input
                label='Description'
                name='description'
                value={description}
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                mb={4}
            />
            <Button type='submit'>{btnText}</Button>
        </FormModal>
    )
}

export default HabitForm
