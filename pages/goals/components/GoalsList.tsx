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
    const { allGoals, errorFetching } = useGetGoals(userID)

    if (errorFetching) {
        return <p>There was an error</p>
    }

    if (!allGoals?.activeGoals) {
        return <Spinner />
    }

    return (
        <>
            {
                allGoals.activeGoals.length === 0 ?
                    <EmptyGoalsList setAddGoalsFormOpen={setAddGoalsFormOpen} /> :
                    <div className='triple-grid'>
                        {
                            allGoals.activeGoals.map((goal: Goal) => <GoalBox key={goal.id} goal={goal} />)
                        }
                    </div>
            }
        </>
    )
}

export default GoalsList