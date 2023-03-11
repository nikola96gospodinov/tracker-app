import { useMemo, useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

import { toKebabCase } from '../../helpers/string-manipulation-functions'
import useGetDocs from '../../hooks/useGetDocs'
import { Goal } from './goals.types'
import { GOALS } from './constants'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { ErrorsDispatch } from '../../types/crud-opearations.types'
import { Dispatch } from '../../typings'
import { FormModal } from '../../components/Form/FormModal'
import { Button } from '../../components/UIElements/Button'
import { collectiveGoalOptions, personalGoalOptions } from './data'

const now = new Date()
const today = now.toISOString().substring(0, 10)
const GoalForm: React.FunctionComponent<{
    setGoalsFormOpen: Dispatch<boolean>
    userID: string
    goal?: Goal
}> = ({ setGoalsFormOpen, userID, goal }) => {
    const router = useRouter()
    const [name, setName] = useState(goal?.name ?? '')
    const [description, setDescription] = useState(goal?.description ?? '')
    const [deadline, setDeadline] = useState(goal?.deadline ?? '')
    const [category, setCategory] = useState(goal?.category ?? '')
    const [errors, setErrors] = useState({
        nameErr: '',
        categoryErr: false,
        form: false
    })

    const { docs: goals } = useGetDocs<Goal>({ userID, path: GOALS })
    const goalsNames = useMemo(() => {
        return goals
            ?.map((goal: Goal) => goal.name)
            .filter((name) => name !== goal?.name)
    }, [goals, goal?.name])

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

        if (nameError() === '' && category) {
            const fields = {
                ...goal,
                name,
                description,
                deadline,
                category,
                id: goal?.id ?? uuidv4(),
                urlPath: toKebabCase(name)
            }

            submitDoc<Goal>({
                path: GOALS,
                orgDoc: fields as Goal,
                userID,
                setDocsFormOpen: setGoalsFormOpen,
                setErrors: setErrors as ErrorsDispatch,
                router
            })
        }
    }

    const formTitle = goal ? 'Update' : 'Set a'
    const isNameErr = errors.nameErr !== ''
    const isCategoryErr = errors.categoryErr
    const btnText = `${goal ? 'Update' : 'Set'} Goal`
    const isFormErr = errors.form
    const formError = `There was an issue ${goal ? 'updating' : 'setting'} your
    goal. Please try again`

    return (
        <FormModal setFormOpen={setGoalsFormOpen}>
            <h1>{formTitle} goal</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {isNameErr && (
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
                    <optgroup label='Personal'>
                        {personalGoalOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label='Collective'>
                        {collectiveGoalOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </optgroup>
                    <option value='' disabled style={{ opacity: 0.5 }}></option>
                </select>
                {isCategoryErr && (
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
                <Button
                    type='submit'
                    text={btnText}
                    btnClass='button-primary'
                />
            </form>
            {isFormErr && (
                <div className='form-error'>
                    <MdErrorOutline />
                    <span>{formError}</span>
                </div>
            )}
        </FormModal>
    )
}

export default GoalForm
