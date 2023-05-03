import useGetDocs from '../../../hooks/useGetDocs'
import EmptyContentList from '../../../components/EmptyContentList'
import { Spinner } from '../../../components/UIElements/Spinner'
import { GoalBox } from './GoalBox'
import { Goal } from '../goals.types'
import { GOALS } from '../constants'
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

    if (goals.length === 0) {
        return (
            <EmptyContentList
                name={GOALS}
                setAddFormOpen={setAddGoalsFormOpen}
            />
        )
    }

    return (
        <div className='triple-grid'>
            {goals.map((goal: Goal) => (
                <GoalBox key={goal.id} goal={goal} />
            ))}
        </div>
    )
}

export default GoalsList
