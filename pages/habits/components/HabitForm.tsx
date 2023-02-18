import React, { useEffect, useMemo, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdErrorOutline } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { toKebabCase } from '../../../helpers/string-manipulation-functions'
import useGetDocs from '../../../hooks/useGetDoc'
import { ErrorsDispatch } from '../../../types/crud-opearations.types'
import { HABITS } from '../constants'
import { Habit, HabitType } from '../types'

const HabitForm: React.FC<{
    setHabitsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    userID: string
    habit?: Habit
}> = ({ setHabitsFormOpen, userID, habit }) => {
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
    const [triedSubmitting, setTriedSubmitting] = useState(false)

    const { docs: habits } = useGetDocs<Habit>({ userID, path: HABITS })
    const habitsNames = useMemo(() => {
        return habits
            ?.map((habit: Habit) => habit.name)
            .filter((name) => name !== habit?.name)
    }, [habit?.name, habits])

    useEffect(() => {
        if (triedSubmitting) {
            if (!errors.nameErr && !errors.form) {
                submitDoc<Habit>({
                    path: HABITS,
                    docs: habits!,
                    orgDoc: habit,
                    newDoc: {
                        id: uuidv4(),
                        name,
                        description,
                        type,
                        target,
                        metric,
                        longestStreak: 0,
                        currentStreak: 0,
                        urlPath: toKebabCase(name)
                    } as Habit,
                    updatedDoc: {
                        ...habit,
                        name,
                        description,
                        type,
                        target,
                        metric
                    } as Habit,
                    userID,
                    setDocsFormOpen: setHabitsFormOpen,
                    errors,
                    setErrors: setErrors as ErrorsDispatch
                })
            }
        }
    }, [triedSubmitting, errors.nameErr, errors.form])

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

        setTriedSubmitting(true)
    }

    return (
        <div className='backdrop'>
            <div className='form-container'>
                <AiFillCloseCircle
                    className='close'
                    onClick={() => setHabitsFormOpen(false)}
                />
                <h1>{habit ? 'Edit' : 'Add'} a habit</h1>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.nameErr !== '' && (
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
                        <span className='field-error'>
                            Please select a target
                        </span>
                    )}
                    <label htmlFor='metric'>Metric</label>
                    <input
                        id='metric'
                        type='text'
                        value={metric}
                        onChange={(e) => setMetric(e.target.value)}
                    />
                    {errors.metricErr && (
                        <span className='field-error'>
                            Please select a metric
                        </span>
                    )}
                    <label htmlFor='description'>Description (Optional)</label>
                    <input
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type='submit'
                        value={`${habit ? 'Edit' : 'Add'} Habit`}
                        className='button button-primary'
                    />
                </form>
                {errors.form && (
                    <div className='form-error'>
                        <MdErrorOutline />
                        <span>
                            There was an issue adding your habit. Please try
                            again
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HabitForm
