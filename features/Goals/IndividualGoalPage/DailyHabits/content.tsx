import Spinner from '../../../../components/UIElements/spinner'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import useUserLogged from '../../../../hooks/useUserLogged'
import { HABITS } from '../../../Habits/constants'
import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import DailyHabitsList from './DailyHabitsList'
import NoHabits from '../NoHabits'
import UpdateHabitList from './UpdateHabitList'

const DailyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
    shortName: string
}> = ({ goal, newElementAdded, shortName }) => {
    const { user } = useUserLogged()
    const {
        docs: dailyHabits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: user?.uid ?? '',
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: 'daily'
    })

    if (loading) {
        return <Spinner size={7.5} isText={false} />
    }

    if (errorFetching) {
        return (
            <p>
                There was an error fetching your habits. Please refresh the page
                and try again.
            </p>
        )
    }

    const noDailyHabits = dailyHabits?.length === 0 || !dailyHabits
    const showUpdateHabitsList = newElementAdded

    return (
        <div style={{ marginTop: '2rem' }}>
            {noDailyHabits && <NoHabits shortName={shortName} />}
            {showUpdateHabitsList && (
                <UpdateHabitList
                    allHabits={dailyHabits}
                    attachedHabits={goal?.habits}
                    goal={goal}
                    userID={user?.uid}
                    shortName={shortName}
                />
            )}
            {goal && <DailyHabitsList goal={goal} dailyHabits={dailyHabits} />}
        </div>
    )
}

export default DailyHabitsContent
