import { ActionMeta } from 'react-select'

import CustomSelect from '../../../../components/Form/CustomSelect'
import { Button } from '../../../../components/UIElements/Button'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import useUserLogged from '../../../../hooks/useUserLogged'
import { HABITS } from '../../../Habits/constants'
import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import NoDailyHabits from './NoDailyHabits'
import UpdateHabitsList from './UpdateHabitsList'

const DailyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
}> = ({ goal }) => {
    const { user } = useUserLogged()
    const { docs: dailyHabits } = useGetFilteredDocs<Habit>({
        userID: user?.uid ?? '',
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: 'daily'
    })
    const noDailyHabits = dailyHabits?.length === 0 || !dailyHabits

    return (
        <div style={{ marginTop: '2rem' }}>
            {noDailyHabits && <NoDailyHabits />}
            {!noDailyHabits && (
                <UpdateHabitsList
                    dailyHabits={dailyHabits}
                    goal={goal}
                    userID={user?.uid}
                />
            )}
        </div>
    )
}

export default DailyHabitsContent
