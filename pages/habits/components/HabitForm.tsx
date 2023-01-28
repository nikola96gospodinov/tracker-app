import { useEffect, useMemo, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdErrorOutline } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import useGetDocs from '../../../hooks/useGetDoc'
import { HABITS } from '../constants'
import { Habit } from '../interfaces'

const HabitForm: React.FC<{
    setHabitsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    userID: string
    habit?: Habit
}> = ({ setHabitsFormOpen, userID, habit }) => {
    const [name, setName] = useState(habit?.name ?? '')
    const [description, setDescription] = useState(habit?.description ?? '')
    const [errors, setErrors] = useState({
        nameErr: '',
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
                        description
                    } as Habit,
                    updatedDoc: {
                        ...habit,
                        name,
                        description
                    } as Habit,
                    userID,
                    setDocsFormOpen: setHabitsFormOpen,
                    errors,
                    setErrors
                })
            }
        }
    }, [triedSubmitting, errors.nameErr, errors.form])

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
            nameErr: nameError()
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
