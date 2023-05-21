import { useContext, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { Button, Flex } from '@chakra-ui/react'

import { toKebabCase } from '../../helpers/string-manipulation-functions'
import useGetDocs from '../../hooks/useGetDocs'
import { Goal } from '../../types/goals.types'
import { GOALS } from '../../constants/goalsConstants'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { ErrorsDispatch } from '../../types/crud-opearations.types'
import { FormModal } from '../../components/Form/FormModal'
import { Input } from '../../components/Form/Input'
import { Textarea } from '../../components/Form/Textarea'
import { UserContext } from '../../context/userContext'
import { today } from '../../helpers/date-manipulation-functions'

const GoalForm: React.FunctionComponent<{
    isFormOpen: boolean
    onFormClose: () => void
    goal?: Goal
}> = ({ isFormOpen, onFormClose, goal }) => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const [name, setName] = useState(goal?.name ?? '')
    const [description, setDescription] = useState(goal?.description ?? '')
    const [deadline, setDeadline] = useState(goal?.deadline ?? '')
    const [target, setTarget] = useState(goal?.target)
    const [progress, setProgress] = useState(goal?.progress)
    const [errors, setErrors] = useState({
        nameErr: '',
        form: false
    })

    const { docs: goals } = useGetDocs<Goal>({ path: GOALS })
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
            nameErr: nameError()
        })

        if (nameError() === '') {
            const fields = {
                ...goal,
                name,
                description,
                deadline,
                target: target ?? null,
                progress: progress ?? null,
                id: goal?.id ?? uuidv4(),
                status: goal?.status ?? 'active',
                urlPath: toKebabCase(name)
            }

            submitDoc<Goal>({
                path: GOALS,
                orgDoc: fields as Goal,
                userID: userId,
                setDocsFormOpen: onFormClose,
                setErrors: setErrors as ErrorsDispatch,
                router
            })
        }
    }

    const formTitle = goal ? 'Update goal' : 'Set a goal'
    const isNameErr = errors.nameErr !== ''
    const btnText = `${goal ? 'Update' : 'Set'} Goal`
    const isFormErr = errors.form
    const formError = `There was an issue ${goal ? 'updating' : 'setting'} your
    goal. Please try again`

    return (
        <FormModal
            formOpen={isFormOpen}
            onFormClose={onFormClose}
            title={formTitle}
            onSubmit={handleFormSubmit}
            isFormError={isFormErr}
            formError={formError}
        >
            <Input
                label='Name'
                name='name'
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                isError={isNameErr}
                errorContent={errors.nameErr}
            />
            <Flex gap={4}>
                <Input
                    label='Progress (Optional)'
                    name='progress'
                    value={progress ?? undefined}
                    type='number'
                    onChange={(e) => setProgress(e.target.valueAsNumber)}
                />
                <Input
                    label='Target (Optional)'
                    name='target'
                    value={target ?? undefined}
                    type='number'
                    onChange={(e) => setTarget(e.target.valueAsNumber)}
                />
            </Flex>
            <Input
                label='Deadline (Optional)'
                name='deadline'
                value={deadline}
                type='date'
                onChange={(e) => setDeadline(e.target.value)}
                min={today}
                pr={3}
            />
            <Textarea
                label='Description (Optional)'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                mb={2}
            />
            <Button type='submit' width='100%'>
                {btnText}
            </Button>
        </FormModal>
    )
}

export default GoalForm
