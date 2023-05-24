import { FunctionComponent } from 'react'
import { Flex, VStack } from '@chakra-ui/react'

import { HABITS } from '../../../constants/habitsConstants'
import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import { Spinner } from '../../../components/UIElements/Spinner'
import { useGetAllActiveHabitsByType } from '../../../hooks/useGetAllActiveHabitsByType'
import { Progress } from './Progress'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { thisWeek, today } from '../../../helpers/date-manipulation-functions'
import { HabitType } from '../../../types/habits.types'
import { useGetRelevantTodos } from './hooks/useGetRelevantTodos'
import { IncompletedItems } from './IncompletedItems'
import { CompletedItems } from './CompletedItems'
import { useGetRelevantMilestones } from './hooks/useGetRelevantMilestones'

export const ImmediateView: FunctionComponent<{
    type?: HabitType
    onOpen: () => void
}> = ({ type, onOpen }) => {
    const {
        activeHabits,
        loading: loadingHabits,
        errorFetching: errorFetchingHabits
    } = useGetAllActiveHabitsByType(type!)
    const {
        completedTodos,
        incompletedTodos,
        loading: loadingTodos,
        errorFetching: errorFetchingTodos
    } = useGetRelevantTodos(type!)
    const {
        completedMilestones,
        incompletedMilestones,
        loading: loadingMilestones,
        errorFetching: errorFetchingMilestones
    } = useGetRelevantMilestones(type!)

    const loading = loadingHabits || loadingTodos || loadingMilestones
    const errorFetching =
        errorFetchingHabits || errorFetchingTodos || errorFetchingMilestones
    const totalLength =
        activeHabits.length +
        completedTodos.length +
        incompletedTodos.length +
        (completedMilestones?.length ?? 0) +
        (incompletedMilestones?.length ?? 0)

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

    const completedHabits = activeHabits.filter(
        ({ currentStreak: { end } }) => {
            if (type === 'daily') return end === today
            return end === thisWeek
        }
    )

    const incompletedHabits = activeHabits.filter(
        ({ currentStreak: { end } }) => {
            if (type === 'daily') return end !== today
            return end !== thisWeek
        }
    )

    return (
        <Flex mt={8} gap={8}>
            <Progress
                totalLength={totalLength}
                completedHabitsLength={completedHabits.length}
                incompletedHabits={incompletedHabits}
                completedTodosLength={completedTodos.length}
                completedMilestonesLength={completedMilestones?.length ?? 0}
            />
            <VStack flexGrow={1} align='flex-start'>
                <IncompletedItems
                    habits={incompletedHabits}
                    todos={incompletedTodos}
                    milestones={incompletedMilestones ?? []}
                    type={type!}
                />
                <CompletedItems
                    habits={completedHabits}
                    todos={completedTodos}
                    milestones={completedMilestones ?? []}
                />
            </VStack>
        </Flex>
    )
}
