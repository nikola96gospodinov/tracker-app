import { FunctionComponent, useContext, useEffect } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import {
    GOAL,
    GOALS,
    MILESTONE,
    MILESTONES
} from '../../../constants/goalsConstants'
import { Spinner } from '../../../components/UIElements/Spinner'
import { MilestoneBox } from '../MilestoneBox/MilestoneBox'
import { ActivePeriod } from '../data'
import { useGetSortedDocs } from './hooks/useGetSortedDocs'
import { NoFilteredDocs } from '../../../components/Docs/NoFilteredDocs'
import { TODO, TODOS } from '../../../constants/todoConstants'
import { Goal, Milestone } from '../../../types/goals.types'
import { GoalBox } from '../../Goal/GoalBox'
import { TodoBox } from '../../Todos/TodosList/TodoBox'
import { Todo } from '../../../types/todos.types'
import { TabsNumbersDispatchContext } from '../context/context'

export const UpcomingMilestones: FunctionComponent<{
    activePeriod?: ActivePeriod
    includeWithNoDeadline?: boolean
}> = ({ activePeriod, includeWithNoDeadline }) => {
    const dispatch = useContext(TabsNumbersDispatchContext)

    const {
        sortedDocs: docs,
        loading,
        errorFetching
    } = useGetSortedDocs({
        activePeriod,
        includeWithNoDeadline
    })

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'SET_WHITHIN_ACTIVE_PERIOD',
                payload: docs.length
            })
        }
    }, [docs, dispatch])

    if (loading) return <Spinner mt={8} text='Loading...' />

    if (errorFetching)
        return <ErrorFetchingDocs docType={MILESTONES} size='sm' />

    if (!docs || docs.length === 0)
        return (
            <NoFilteredDocs docType={`${MILESTONES}, ${GOALS}, or ${TODOS}`} />
        )

    return (
        <SimpleGrid columns={3} gap={4} w='100%' pt={8}>
            {docs.map((doc) => {
                switch (doc.type) {
                    case MILESTONE:
                        return (
                            <MilestoneBox
                                key={doc.id}
                                milestone={doc as unknown as Milestone}
                            />
                        )
                    case GOAL:
                        return (
                            <GoalBox
                                key={doc.id}
                                goal={doc as unknown as Goal}
                            />
                        )
                    case TODO:
                        return (
                            <TodoBox
                                key={doc.id}
                                todo={doc as unknown as Todo}
                            />
                        )
                }
            })}
        </SimpleGrid>
    )
}
