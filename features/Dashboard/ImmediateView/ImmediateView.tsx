import { FunctionComponent, useContext, useEffect } from 'react'
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
import { useGetRelevantGoals } from './hooks/useGetRelevantGoals'
import { TabsNumbersDispatchContext } from '../context/context'

export const ImmediateView: FunctionComponent<{
    type?: HabitType
    onOpen: () => void
}> = ({ type, onOpen }) => {
    const dispatch = useContext(TabsNumbersDispatchContext)

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
    const {
        completedGoals,
        incompletedGoals,
        loading: loadingGoals,
        errorFetching: errorFetchingGoals
    } = useGetRelevantGoals(type!)

    const loading =
        loadingHabits || loadingTodos || loadingMilestones || loadingGoals

    const errorFetching =
        errorFetchingHabits ||
        errorFetchingTodos ||
        errorFetchingMilestones ||
        errorFetchingGoals

    const totalLength =
        activeHabits.length +
        completedTodos.length +
        incompletedTodos.length +
        (completedMilestones?.length ?? 0) +
        (incompletedMilestones?.length ?? 0) +
        (completedGoals?.length ?? 0) +
        (incompletedGoals?.length ?? 0)

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

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: type === 'daily' ? 'SET_TODAY' : 'SET_THIS_WEEK',
                payload: {
                    activeDocsNumber:
                        incompletedHabits.length +
                        incompletedTodos.length +
                        (incompletedMilestones?.length ?? 0) +
                        (incompletedGoals?.length ?? 0),
                    inactiveDocsNumber:
                        completedHabits.length +
                        completedTodos.length +
                        (completedMilestones?.length ?? 0) +
                        (completedGoals?.length ?? 0)
                }
            })
        }
    }, [
        completedHabits.length,
        incompletedHabits.length,
        completedTodos.length,
        incompletedTodos.length,
        completedMilestones?.length,
        incompletedMilestones?.length,
        completedGoals?.length,
        incompletedGoals?.length,
        dispatch,
        type
    ])

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
                />
            </VStack>
        </Flex>
    )
}
