import { useState } from 'react'
import { isEqual } from 'lodash'

import CustomSelect from '../../../../components/Form/CustomSelect'
import { Button } from '../../../../components/UIElements/Button'
import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import { submitDoc } from '../../../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS } from '../../constants'

import styles from '../../goal.module.scss'

interface Props {
    dailyHabits: Habit[] | undefined
    goal: Goal | undefined
    userID: string | undefined
}

const UpdateHabitsList = ({ dailyHabits, goal, userID }: Props) => {
    const defaultValue = goal?.habits?.map((id) => {
        const habit = dailyHabits?.find((habit) => habit.id === id)
        return {
            value: habit?.id,
            label: habit?.name
        }
    })
    const existingHabits = defaultValue?.map(({ value }) => value)

    const [habitIds, setHabitIds] = useState(existingHabits)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const dailyHabitsOptions = dailyHabits?.map((habit) => ({
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
        await submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goal?.id,
                habits: habitIds
            } as Goal, // no ideal but not the end of the world either
            userID: userID ?? '',
            setError: setError
        })
        setLoading(false)
    }

    const btnClass = !isEqual(habitIds, existingHabits)
        ? 'button-primary'
        : 'button-disabled'
    const disabled = isEqual(habitIds, existingHabits)

    return (
        <div className={styles.updateHabits}>
            <CustomSelect
                options={dailyHabitsOptions}
                isMulti
                defaultValue={defaultValue}
                onChange={onChange}
            />
            <Button
                text='Save'
                btnClass={btnClass}
                type='button'
                disabled={disabled}
                onClick={onSubmit}
                isLoading={loading}
            />
        </div>
    )
}

export default UpdateHabitsList
