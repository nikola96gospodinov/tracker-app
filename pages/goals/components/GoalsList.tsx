import useGetGoals from '../hooks/useGetGoals'
import EmptyGoalsList from './EmptyGoalsList'
import Spinner from '../../../components/spinner'
import { GoalBox } from './goal'
import { Goal } from '../interfaces'

interface Props {
    userID: string
    setAddGoalsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GoalsList = ({ userID, setAddGoalsFormOpen }: Props) => {
    const { goals, errorFetching } = useGetGoals(userID)

    if (errorFetching) {
        return <p>There was an error</p>
    }

    if (!goals) {
        return <Spinner />
    }

    return (
        <>
            {
                goals.length === 0 ?
                    <EmptyGoalsList setAddGoalsFormOpen={setAddGoalsFormOpen} /> :
                    <div className='triple-grid'>
                        { goals.map((goal: Goal) => <GoalBox key={goal.id} goal={goal} />) }
                    </div>
            }
        </>
    )
}

export default GoalsList