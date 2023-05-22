import { SimpleGrid } from '@chakra-ui/react'

import NoDocsYet from '../../components/Docs/NoDocsYet'
import { Spinner } from '../../components/UIElements/Spinner'
import { GoalBox } from '../Goal/GoalBox'
import { Goal } from '../../types/goals.types'
import { GOALS } from '../../constants/goalsConstants'
import { ErrorFetchingDocs } from '../../components/Docs/ErrorFetchingDocs'
import useGetFilteredDocs from '../../hooks/useGetFilteredDocs'
import useGetDocs from '../../hooks/useGetDocs'

const GoalsList: React.FunctionComponent<{
    setAddGoalsFormOpen: () => void
    activeOptionValue: string
}> = ({ setAddGoalsFormOpen, activeOptionValue }) => {
    const { docs: allGoals, errorFetching: errorFetchingAllGoals } =
        useGetDocs<Goal>({
            path: GOALS
        })
    const { docs: goals, errorFetching } = useGetFilteredDocs<Goal>({
        path: GOALS,
        fieldPath: 'status',
        opStr: '==',
        value: activeOptionValue
    })

    if (errorFetching || errorFetchingAllGoals)
        return <ErrorFetchingDocs docType={GOALS} />

    if (!goals || !allGoals) return <Spinner text='Loading...' />

    if (allGoals.length === 0)
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
            {(activeOptionValue === 'all' ? allGoals : goals).map(
                (goal: Goal) => (
                    <GoalBox key={goal.id} goal={goal} />
                )
            )}
        </SimpleGrid>
    )
}

export default GoalsList
