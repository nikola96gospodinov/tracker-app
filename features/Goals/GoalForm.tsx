import { useMemo, useState } from 'react'
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
import { goalOptions } from './data'
import { Input } from '../../components/Form/Input'
import { Textarea } from '../../components/Form/Textarea'
import { Select } from '../../components/Form/Select'

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

    const formTitle = goal ? 'Update goal' : 'Set a goal'
    const isNameErr = errors.nameErr !== ''
    const isCategoryErr = errors.categoryErr
    const btnText = `${goal ? 'Update' : 'Set'} Goal`
    const isFormErr = errors.form
    const formError = `There was an issue ${goal ? 'updating' : 'setting'} your
    goal. Please try again`

    return (
        <FormModal
            setFormOpen={setGoalsFormOpen}
            title={formTitle}
            onSubmit={handleFormSubmit}
            isFormError={isFormErr}
            formError={formError}
        >
            <Input
                labelText='Name'
                name='name'
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                isError={isNameErr}
                error={errors.nameErr}
            />
            <Select
                labelText='Category'
                name='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                isError={isCategoryErr}
                error='Please select a category'
                options={goalOptions}
            />
            <Input
                labelText='Deadline (Optional)'
                name='deadline'
                value={deadline}
                type='date'
                onChange={(e) => setDeadline(e.target.value)}
                min={today}
            />
            <Textarea
                labelText='Description (Optional)'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button type='submit' text={btnText} btnClass='button-primary' />
        </FormModal>
    )
}

export default GoalForm
