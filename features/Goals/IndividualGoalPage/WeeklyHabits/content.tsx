import Spinner from '../../../../components/UIElements/spinner'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'
import useUserLogged from '../../../../hooks/useUserLogged'
import { HABITS } from '../../../Habits/constants'
import { Habit } from '../../../Habits/habits.types'
import { Goal } from '../../goals.types'
import UpdateHabitsList from '../DailyHabits/UpdateHabitList'
import NoHabits from '../NoHabits'
import WeeklyHabitsList from './WeeklyHabitsList'

const WeeklyHabitsContent: React.FunctionComponent<{
    goal: Goal | undefined
    newElementAdded: boolean
    shortName: string
}> = ({ goal, newElementAdded, shortName }) => {
    const { user } = useUserLogged()
    const {
        docs: weeklyTargets,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: user?.uid ?? '',
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: 'weekly'
    })

    if (loading) {
        return <Spinner size={7.5} isText={false} />
    }

    if (errorFetching) {
        return (
            <p>
                There was an error fetching your targets. Please refresh the
                page and try again.
            </p>
        )
    }

    const noWeeklyTargets = weeklyTargets?.length === 0 || !weeklyTargets
    const showUpdateTargetsList = newElementAdded

    return (
        <div style={{ marginTop: '2rem' }}>
            {noWeeklyTargets && <NoHabits shortName={shortName} />}
            {showUpdateTargetsList && (
                <UpdateHabitsList
                    allHabits={weeklyTargets}
                    attachedHabits={goal?.targets}
                    goal={goal}
                    userID={user?.uid}
                    shortName={shortName}
                />
            )}
            {goal && (
                <WeeklyHabitsList goal={goal} weeklyTargets={weeklyTargets} />
            )}
        </div>
    )
}

export default WeeklyHabitsContent
