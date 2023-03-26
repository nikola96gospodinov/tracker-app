import { useState } from 'react'
import { isEqual } from 'lodash'

import CustomSelect from '../../../components/Form/CustomSelect'
import { Button } from '../../../components/UIElements/Button'
import { Habit } from '../../Habits/habits.types'
import { Goal } from '../goals.types'
import { submitDoc } from '../../../helpers/crud-operations/crud-operations-main-docs'
import { GOALS, DAILY_HABITS, WEEKLY_HABITS } from '../constants'

import styles from '../../goal.module.scss'

const UpdateHabitsList: React.FunctionComponent<{
    allHabits: Habit[] | undefined
    attachedHabits: string[] | undefined
    goal: Goal | undefined
    userID: string | undefined
    shortName: string
}> = ({ allHabits, attachedHabits, goal, userID, shortName }) => {
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

    const btnClass = !isEqual(habitIds, existingHabits)
        ? 'button-primary'
        : 'button-disabled'
    const disabled = isEqual(habitIds, existingHabits)

    return (
        <div className={styles.updateHabits}>
            <CustomSelect
                options={habitsOptions}
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
