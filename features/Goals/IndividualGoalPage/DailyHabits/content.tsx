import Spinner from '../../../../components/UIElements/spinner'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import useUserLogged from '../../../../hooks/useUserLogged'
import { HABITS } from '../../../Habits/constants'
import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import DailyHabitsList from './DailyHabitsList'
import NoDailyHabits from './NoDailyHabits'
import UpdateHabitsList from './UpdateHabitsList'

const DailyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
}> = ({ goal, newElementAdded }) => {
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
                There was an error fetching your goals. Please refresh the page
                and try again.
            </p>
        )
    }

    const noDailyHabits = dailyHabits?.length === 0 || !dailyHabits
    const showUpdateHabitsList = newElementAdded

    return (
        <div style={{ marginTop: '2rem' }}>
            {noDailyHabits && <NoDailyHabits />}
            {showUpdateHabitsList && (
                <UpdateHabitsList
                    dailyHabits={dailyHabits}
                    goal={goal}
                    userID={user?.uid}
                />
            )}
            {goal && <DailyHabitsList goal={goal} dailyHabits={dailyHabits} />}
        </div>
    )
}

export default DailyHabitsContent
