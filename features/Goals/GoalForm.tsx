import { useEffect, useMemo, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdErrorOutline } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { toKebabCase } from '../../helpers/string-manipulation-functions'
import useGetDocs from '../../hooks/useGetDoc'
import { Goal } from '../../pages/goals/types'
import { GOALS } from '../../pages/goals/constants'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { ErrorsDispatch } from '../../types/crud-opearations.types'
import { Dispatch } from '../../typings'
import { FormModal } from '../../components/Form/FormModal'

const now = new Date()
const today = now.toISOString().substring(0, 10)
const GoalForm: React.FunctionComponent<{
    setGoalsFormOpen: Dispatch<boolean>
    userID: string
    goal?: Goal
}> = ({ setGoalsFormOpen, userID, goal }) => {
    const [name, setName] = useState(goal?.name ?? '')
    const [description, setDescription] = useState(goal?.description ?? '')
    const [deadline, setDeadline] = useState(goal?.deadline ?? '')
    const [category, setCategory] = useState(goal?.category ?? '')
    const [errors, setErrors] = useState({
        nameErr: '',
        categoryErr: false,
        form: false
    })
    const [triedSubmitting, setTriedSubmitting] = useState(false)

    const { docs: goals } = useGetDocs<Goal>({ userID, path: GOALS })
    const goalsNames = useMemo(() => {
        return goals
            ?.map((goal: Goal) => goal.name)
            .filter((name) => name !== goal?.name)
    }, [goals, goal?.name])

    useEffect(() => {
        if (triedSubmitting) {
            if (!errors.nameErr && !errors.categoryErr && !errors.form) {
                submitDoc<Goal>({
                    path: GOALS,
                    docs: goals!,
                    orgDoc: goal,
                    updatedDoc: {
                        ...goal,
                        name,
                        description,
                        deadline,
                        category
                    } as Goal,
                    newDoc: {
                        id: uuidv4(),
                        name,
                        category,
                        deadline,
                        description,
                        urlPath: toKebabCase(name)
                    } as Goal,
                    userID,
                    setDocsFormOpen: setGoalsFormOpen,
                    errors,
                    setErrors: setErrors as ErrorsDispatch
                })
            }
        }
    }, [triedSubmitting, errors.nameErr, errors.categoryErr, errors.form])

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const nameError = () => {
            if (name === '') return 'Please set a name for the goal'
            if (goalsNames?.includes(name))
                return 'Name of the goal must be unique'
            return ''
        }

        setErrors({
            ...errors,
            nameErr: nameError(),
            categoryErr: !Boolean(category)
        })

        setTriedSubmitting(true)
    }

    return (
        <FormModal setFormOpen={setGoalsFormOpen}>
            <h1>{goal ? 'Update' : 'Set a'} goal</h1>
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
                <label htmlFor='category'>Category</label>
                <select
                    id='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option
                        value=''
                        disabled
                        selected
                        style={{ opacity: 0.5 }}
                    ></option>
                    <optgroup label='Individual'>
                        <option value='health'>Health</option>
                        <option value='career'>Career</option>
                        <option value='financial'>Financial</option>
                        <option value='other-personal'>
                            Other (Individual)
                        </option>
                    </optgroup>
                    <optgroup label='Collective'>
                        <option value='family'>Family</option>
                        <option value='partner'>Partner</option>
                        <option value='comunity'>Community</option>
                        <option value='other-collective'>
                            Other (Collective)
                        </option>
                    </optgroup>
                    <option value='' disabled style={{ opacity: 0.5 }}></option>
                </select>
                {errors.categoryErr && (
                    <span className='field-error'>
                        Please select a category
                    </span>
                )}
                <label htmlFor='deadline'>Deadline (Optional)</label>
                <input
                    id='deadline'
                    type='date'
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={today}
                />
                <label htmlFor='description'>Description (Optional)</label>
                <textarea
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type='submit'
                    value={`${goal ? 'Update' : 'Set'} Goal`}
                    className='button button-primary'
                />
            </form>
            {errors.form && (
                <div className='form-error'>
                    <MdErrorOutline />
                    <span>
                        There was an issue {goal ? 'updating' : 'setting'} your
                        goal. Please try again
                    </span>
                </div>
            )}
        </FormModal>
    )
}

export default GoalForm
