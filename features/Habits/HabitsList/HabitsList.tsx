import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { Spinner } from '../../../components/UIElements/Spinner'
import useGetDocs from '../../../hooks/useGetDocs'
import { HABITS } from '../constants'
import { Habit } from '../habits.types'
import { Dispatch } from '../../../typings'
import { HabitBox } from './HabitBox'

const HabitsList: React.FunctionComponent<{
    userID: string
    setAddHabitsFormOpen: Dispatch<boolean>
}> = ({ userID, setAddHabitsFormOpen }) => {
    const { docs: habits, errorFetching } = useGetDocs<Habit>({
        userID,
        path: HABITS
    })

    if (errorFetching) {
        return <p>There was an error</p>
    }

    if (!habits) {
        return <Spinner />
    }

    if (habits.length === 0) {
        return <NoDocsYet name={HABITS} setAddFormOpen={setAddHabitsFormOpen} />
    }

    return (
        <div className='triple-grid'>
            {habits.map((habit: Habit) => (
                <HabitBox key={habit.id} habit={habit} />
            ))}
        </div>
    )
}

export default HabitsList
