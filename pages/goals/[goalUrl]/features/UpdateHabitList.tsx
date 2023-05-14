import { useState } from 'react'
import { isEqual } from 'lodash'
import { Flex, Button } from '@chakra-ui/react'

import MultiSelect from '../../../../components/Form/MultiSelect'
import { Habit } from '../../../habits/habits.types'
import { Goal } from '../../goals.types'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS, DAILY_HABITS, WEEKLY_HABITS } from '../../constants'
import SaveIcon from '../../../../components/Icons/SaveIcon'
import CloseIcon from '../../../../components/Icons/CloseIcon'
import { Dispatch } from '../../../../typings'

const UpdateHabitsList: React.FunctionComponent<{
    allHabits: Habit[] | undefined
    attachedHabits: string[] | undefined
    goal: Goal | undefined
    userID: string | undefined
    shortName: string
    setNewElementAdded: Dispatch<boolean>
}> = ({
    allHabits,
    attachedHabits,
    goal,
    userID,
    shortName,
    setNewElementAdded
}) => {
    const defaultValue = attachedHabits?.map((id) => {
        const habit = allHabits?.find((habit) => habit.id === id)
        return {
            value: habit?.id,
            label: habit?.name
        }
    })
    const existingHabits = defaultValue?.map(({ value }) => value)

    const [habitIds, setHabitIds] = useState(existingHabits)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const habitsOptions = allHabits?.map((habit) => ({
        value: habit.id,
        label: habit.name
    }))

    const onChange = (newValue: unknown) => {
        const habitIds = (newValue as { value: string }[]).map(
            ({ value }) => value
        )
        setHabitIds(habitIds)
    }

    const onSubmit = async () => {
        setLoading(true)

        let orgDoc = {
            id: goal?.id
        } as Goal // not ideal but not the end of the world either

        if (shortName === DAILY_HABITS) {
            orgDoc = {
                ...orgDoc,
                dailyHabits: habitIds as string[]
            }
        }

        if (shortName === WEEKLY_HABITS) {
            orgDoc = {
                ...orgDoc,
                weeklyHabits: habitIds as string[]
            }
        }

        await submitDoc<Goal>({
            path: GOALS,
            orgDoc,
            userID: userID ?? '',
            setError: setError
        })

        setLoading(false)
    }

    const disabled = isEqual(habitIds, existingHabits)
    const btnVariant = disabled ? 'disabled' : 'primary'
    const btnTextColor = disabled ? 'purple.300' : 'neutral.50'

    return (
        <Flex gap={4}>
            <MultiSelect
                options={habitsOptions}
                isMulti
                defaultValue={defaultValue}
                onChange={onChange}
            />
            <Button
                variant={btnVariant}
                disabled={disabled}
                onClick={disabled ? () => {} : onSubmit} // This is necessary since submiting even when disablded was occuring
                isLoading={loading}
                color={btnTextColor}
                p={4}
                height='54px'
                boxShadow='inset'
                ml={4}
            >
                <SaveIcon />
            </Button>
            <Button
                variant='delete'
                p={4}
                height='54px'
                boxShadow='inset'
                bg='red.50'
                color='red.900'
                _hover={{
                    bg: 'red.500',
                    color: 'white'
                }}
                onClick={() => setNewElementAdded(false)}
            >
                <CloseIcon isFull={false} />
            </Button>
        </Flex>
    )
}

export default UpdateHabitsList
