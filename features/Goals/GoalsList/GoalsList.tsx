import useGetDocs from '../../../hooks/useGetDoc'
import EmptyContentList from '../../../components/EmptyContentList'
import Spinner from '../../../components/UIElements/spinner'
import { GoalBox } from './GoalBox'
import { Goal } from '../../../pages/goals/types'
import { GOALS } from '../../../pages/goals/constants'
import { Dispatch } from '../../../typings'

const GoalsList: React.FunctionComponent<{
    userID: string
    setAddGoalsFormOpen: Dispatch<boolean>
}> = ({ userID, setAddGoalsFormOpen }) => {
    const { docs: goals, errorFetching } = useGetDocs<Goal>({
        userID,
        path: GOALS
    })

    if (errorFetching) {
        return <p>There was an error</p>
    }

    if (!goals) {
        return <Spinner />
    }

    return (
        <>
            {goals.length === 0 ? (
                <EmptyContentList
                    name={GOALS}
                    setAddFormOpen={setAddGoalsFormOpen}
                />
            ) : (
                <div className='triple-grid'>
                    {goals.map((goal: Goal) => (
                        <GoalBox key={goal.id} goal={goal} />
                    ))}
                </div>
            )}
        </>
    )
}

export default GoalsList