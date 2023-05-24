import { FunctionComponent } from 'react'
import { Flex, VStack } from '@chakra-ui/react'

import { HABITS } from '../../../constants/habitsConstants'
import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import { Spinner } from '../../../components/UIElements/Spinner'
import { useGetAllActiveHabitsByType } from '../../../hooks/useGetAllActiveHabitsByType'
import { Progress } from './Progress'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import {
    thisWeek,
    today,
    formatWeek
} from '../../../helpers/date-manipulation-functions'
import { HabitType } from '../../../types/habits.types'
import { useGetRelevantTodos } from '../../../hooks/useGetRelevantTodos'
import { IncompletedItems } from './IncompletedItems'
import { CompletedItems } from './CompletedItems'

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
        todos,
        loading: loadingTodos,
        errorFetching: errorFetchingTodos
    } = useGetRelevantTodos(type!)

    const loading = loadingHabits || loadingTodos
    const errorFetching = errorFetchingHabits || errorFetchingTodos
    const totalLength = activeHabits.length + todos.length

    if (loading) return <Spinner mt={8} text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} size='sm' />

    if (totalLength === 0)
        return (
            <NoDocsYet
                docType={HABITS}
                onClick={() => onOpen()}
                size='sm'
                customMessage={`You haven't added any habits to your dashboard yet 🤔`}
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

    const completedTodos = todos.filter(({ status, completedAt }) => {
        if (type === 'daily') {
            return status === 'completed' && completedAt === today
        } else {
            return (
                status === 'completed' && formatWeek(completedAt) === thisWeek
            )
        }
    })

    const incompletedTodos = todos.filter(({ status }) => status === 'active')

    return (
        <Flex mt={8} gap={8}>
            <Progress
                totalLength={totalLength}
                completedHabitsLength={completedHabits.length}
                incompletedHabits={incompletedHabits}
                completedTodosLength={completedTodos.length}
            />
            <VStack flexGrow={1} align='flex-start'>
                <IncompletedItems
                    habits={incompletedHabits}
                    todos={incompletedTodos}
                    type={type!}
                />
                <CompletedItems
                    habits={completedHabits}
                    todos={completedTodos}
                />
            </VStack>
        </Flex>
    )
}
