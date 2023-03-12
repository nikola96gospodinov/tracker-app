import React, { useMemo, useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'
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

    const action = habit ? 'Edit' : 'Add'
    const nameErr = errors.nameErr !== ''
    const btnText = `${action} Habit`

    return (
        <FormModal setFormOpen={setHabitsFormOpen}>
            <h1>{action} a habit</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameErr && (
                    <span className='field-error'>{errors.nameErr}</span>
                )}
                <div className='radio-holder'>
                    <p>Measured: </p>
                    <label>
                        <input
                            type='radio'
                            id='daily'
                            name='type'
                            value='daily'
                            onChange={handleRadioChange}
                            checked={type === 'daily'}
                        />
                        Daily
                    </label>
                    <label>
                        <input
                            type='radio'
                            id='weekly'
                            name='type'
                            value='weekly'
                            onChange={handleRadioChange}
                            checked={type === 'weekly'}
                        />
                        Weekly
                    </label>
                </div>
                <label htmlFor='target'>Target</label>
                <input
                    id='target'
                    type='number'
                    value={target}
                    onChange={(e) => setTarget(+e.target.value)}
                    min={1}
                />
                {errors.targetErr && (
                    <span className='field-error'>Please select a target</span>
                )}
                <label htmlFor='metric'>Metric</label>
                <input
                    id='metric'
                    type='text'
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                />
                {errors.metricErr && (
                    <span className='field-error'>Please select a metric</span>
                )}
                <label htmlFor='description'>Description (Optional)</label>
                <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    type='submit'
                    text={btnText}
                    btnClass='button-primary'
                />
            </form>
            {errors.form && (
                <div className='form-error'>
                    <MdErrorOutline />
                    <span>
                        There was an issue adding your habit. Please try again
                    </span>
                </div>
            )}
        </FormModal>
    )
}

export default HabitForm
