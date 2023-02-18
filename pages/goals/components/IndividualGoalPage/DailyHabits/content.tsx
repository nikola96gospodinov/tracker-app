import { ActionMeta } from 'react-select'

import CustomSelect from '../../../../../components/CustomSelect'
import { Habit } from '../../../../habits/types'
import { Goal } from '../../../types'
import NoDailyHabits from './NoDailyHabits'

const DailyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    allHabits: Habit[] | undefined
}> = ({ goal, allHabits }) => {
    const dailyHabits = allHabits?.filter((habit) => habit.type === 'daily')
    const noDailyHabits = dailyHabits?.length === 0
    const defaultValue = dailyHabits
        ?.filter((habit) => habit.attachedGoals?.includes(goal!.id))
        .map((habit) => ({
            value: habit.id,
            label: habit.name
        }))
    const dailyHabitsOptions = dailyHabits?.map((habit) => ({
        value: habit.id,
        label: habit.name
    }))

    const onChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
        const habitIds = (newValue as { value: string }[]).map(
            ({ value }) => value
        )
        // Update the goal in the DB

        // TODO: Update the habits in the DB - LATER
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            {noDailyHabits && <NoDailyHabits />}
            {!noDailyHabits && (
                <CustomSelect
                    options={dailyHabitsOptions}
                    isMulti
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default DailyHabitsContent
