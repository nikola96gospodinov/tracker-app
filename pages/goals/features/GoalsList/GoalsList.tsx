import useGetDocs from '../../../../hooks/useGetDocs'
import NoDocsYet from '../../../../components/Docs/NoDocsYet'
import { Spinner } from '../../../../components/UIElements/Spinner'
import { GoalBox } from './GoalBox'
import { Goal } from '../../goals.types'
import { GOALS } from '../../constants'
import { Dispatch } from '../../../../typings'
import { ErrorFetchingDocs } from '../../../../components/Docs/ErrorFetchingDocs'
import { SimpleGrid } from '@chakra-ui/react'

const GoalsList: React.FunctionComponent<{
    userID: string
    setAddGoalsFormOpen: () => void
}> = ({ userID, setAddGoalsFormOpen }) => {
    const { docs: goals, errorFetching } = useGetDocs<Goal>({
        userID,
        path: GOALS
    })

    if (errorFetching) return <ErrorFetchingDocs docType={GOALS} />

    if (!goals) return <Spinner text='Loading...' />

    if (goals.length === 0)
        return (
            <NoDocsYet docType={GOALS} onClick={() => setAddGoalsFormOpen()} />
        )

    return (
        <SimpleGrid
            columns={3}
            spacing={6}
            minChildWidth='300px'
            templateColumns='1fr 1fr 1fr'
        >
            {goals.map((goal: Goal) => (
                <GoalBox key={goal.id} goal={goal} />
            ))}
        </SimpleGrid>
    )
}

export default GoalsList
