import { useContext } from 'react'

import { Spinner } from '../../../../components/UIElements/spinner'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../Habits/constants'
import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import DailyHabitsList from './DailyHabitsList'
import NoHabits from '../NoHabits'
import UpdateHabitList from '../UpdateHabitList'
import { UserContext } from '../../../../context/userContext'
import { ErrorFetchingDocs } from '../../../../components/Docs/ErrorFetchingDocs'

const DailyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
    shortName: string
}> = ({ goal, newElementAdded, shortName }) => {
    const { userId } = useContext(UserContext)
    const {
        docs: dailyHabits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: userId,
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: 'daily'
    })

    if (loading) return <Spinner />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} />

    const noDailyHabits = dailyHabits?.length === 0 || !dailyHabits
    const showUpdateHabitsList = newElementAdded

    return (
        <div style={{ marginTop: '2rem' }}>
            {noDailyHabits && <NoHabits shortName={shortName} />}
            {showUpdateHabitsList && (
                <UpdateHabitList
                    allHabits={dailyHabits}
                    attachedHabits={goal?.dailyHabits}
                    goal={goal}
                    userID={userId}
                    shortName={shortName}
                />
            )}
            {goal && <DailyHabitsList goal={goal} dailyHabits={dailyHabits} />}
        </div>
    )
}

export default DailyHabitsContent
