import { FunctionComponent } from 'react'
import { Flex, VStack } from '@chakra-ui/react'

import { HABITS } from '../../../constants/habitsConstants'
import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import { Spinner } from '../../../components/UIElements/Spinner'
import { Progress } from './Progress'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { HabitType } from '../../../types/habits.types'
import { IncompletedItems } from './IncompletedItems'
import { CompletedItems } from './CompletedItems'
import { useGetRelevantDocs } from './hooks/useGetRelevantDocs'

export const ImmediateView: FunctionComponent<{
    type?: HabitType
    onOpen: () => void
}> = ({ type, onOpen }) => {
    const {
        loading,
        errorFetching,
        totalLength,
        completedHabits,
        incompletedHabits,
        completedTodos,
        incompletedTodos,
        completedMilestones,
        incompletedMilestones,
        completedGoals,
        incompletedGoals
    } = useGetRelevantDocs(type!)

    if (loading) return <Spinner mt={8} text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} size='sm' />

    if (totalLength === 0)
        return (
            <NoDocsYet
                docType={HABITS}
                onClick={() => onOpen()}
                size='sm'
                customMessage={`You don't have anything on your dashboard yet 🤔`}
            />
        )

    return (
        <Flex mt={8} gap={8}>
            <Progress
                totalLength={totalLength}
                completedHabitsLength={completedHabits.length}
                incompletedHabits={incompletedHabits}
                completedTodosLength={completedTodos.length}
                completedMilestonesLength={completedMilestones?.length ?? 0}
                completedGoalsLength={completedGoals?.length ?? 0}
            />
            <VStack flexGrow={1} align='flex-start'>
                <IncompletedItems
                    habits={incompletedHabits}
                    todos={incompletedTodos}
                    milestones={incompletedMilestones ?? []}
                    goals={incompletedGoals ?? []}
                    type={type!}
                />
                <CompletedItems
                    habits={completedHabits}
                    todos={completedTodos}
                    milestones={completedMilestones ?? []}
                    goals={completedGoals ?? []}
                    type={type!}
                />
            </VStack>
        </Flex>
    )
}
