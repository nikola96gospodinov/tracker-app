import useGetDocs from '../../../../hooks/useGetDoc'
import EmptyGoalsList from './EmptyGoalsList'
import Spinner from '../../../../components/spinner'
import { GoalBox } from './GoalListing'
import { Goal } from '../../interfaces'
import { GOALS } from '../../constants'

interface Props {
    userID: string
    setAddGoalsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GoalsList = ({ userID, setAddGoalsFormOpen }: Props) => {
    const { docs: goals, errorFetching } = useGetDocs<Goal>({ userID, path: GOALS })

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