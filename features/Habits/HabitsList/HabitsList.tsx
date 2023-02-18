import EmptyContentList from '../../../components/EmptyContentList'
import Spinner from '../../../components/UIElements/spinner'
import useGetDocs from '../../../hooks/useGetDoc'
import { HABITS } from '../../../pages/habits/constants'
import { Habit } from '../../../pages/habits/types'
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

    return (
        <>
            {habits.length === 0 ? (
                <EmptyContentList
                    name={HABITS}
                    setAddFormOpen={setAddHabitsFormOpen}
                />
            ) : (
                <div className='triple-grid'>
                    {habits.map((habit: Habit) => (
                        <HabitBox key={habit.id} habit={habit} />
                    ))}
                </div>
            )}
        </>
    )
}

export default HabitsList
