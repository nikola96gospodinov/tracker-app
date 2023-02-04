import EmptyContentList from '../../../../components/EmptyContentList'
import Spinner from '../../../../components/spinner'
import useGetDocs from '../../../../hooks/useGetDoc'
import { HABITS } from '../../constants'
import { Habit } from '../../types'
import { HabitBox } from './HabitBox'

interface Props {
    userID: string
    setAddHabitsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HabitsList = ({ userID, setAddHabitsFormOpen }: Props) => {
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
                        <HabitBox
                            key={habit.id}
                            habit={habit}
                            userID={userID}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default HabitsList
