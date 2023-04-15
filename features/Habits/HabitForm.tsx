import React, { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { toKebabCase } from '../../helpers/string-manipulation-functions'
import useGetDocs from '../../hooks/useGetDocs'
import { ErrorsDispatch } from '../../types/crud-opearations.types'
import { HABITS } from './constants'
import { Habit, HabitType } from './habits.types'
import { Dispatch } from '../../typings'
import { FormModal } from '../../components/Form/FormModal'
import { Button } from '../../components/UIElements/Button'
import { Input } from '../../components/Form/Input'
import { RadioGroup } from '../../components/Form/Radio/RadioGroup'
import { habitTypes } from './data'

const HabitForm: React.FunctionComponent<{
    setHabitsFormOpen: Dispatch<boolean>
    userID: string
    habit?: Habit
}> = ({ setHabitsFormOpen, userID, habit }) => {
    const router = useRouter()
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

    const { docs: habits } = useGetDocs<Habit>({ userID, path: HABITS })
    const habitsNames = useMemo(() => {
        return habits
            ?.map((habit: Habit) => habit.name)
            .filter((name) => name !== habit?.name)
    }, [habit?.name, habits])

    const handleRadioChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setType(e.target.value as HabitType)
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
                userID,
                setDocsFormOpen: setHabitsFormOpen,
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
            setFormOpen={setHabitsFormOpen}
            title={title}
            onSubmit={handleFormSubmit}
            isFormError={errors.form}
            formError={formErrorText}
        >
            <Input
                labelText='Name'
                name='name'
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                isError={nameErr}
                error={errors.nameErr}
            />
            <RadioGroup
                options={habitTypes}
                currentValue={type}
                onChange={handleRadioChange}
                name='type'
                description='Measured:'
            />
            <Input
                labelText='Target'
                name='target'
                value={target}
                type='target'
                onChange={(e) => setTarget(+e.target.value)}
                min={1}
                isError={errors.targetErr}
                error='Please select a target'
            />
            <Input
                labelText='Metric'
                name='metric'
                value={metric}
                type='text'
                onChange={(e) => setMetric(e.target.value)}
                isError={errors.metricErr}
                error='Please select a metric'
            />
            <Input
                labelText='Description'
                name='description'
                value={description}
                type='text'
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button type='submit' text={btnText} btnClass='button-primary' />
        </FormModal>
    )
}

export default HabitForm
