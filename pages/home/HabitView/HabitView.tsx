import { FunctionComponent } from 'react'
import { Flex, VStack } from '@chakra-ui/react'

import { HABITS } from '../../habits/constants'
import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import { Spinner } from '../../../components/Spinner'
import { useGetAllActiveHabitsByType } from '../hooks/useGetAllActiveHabitsByType'
import { Progress } from './Progress'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { CompletedHabits } from './CompletedHabits'
import { IncompletedHabits } from './IncompletedHabits'
import { thisWeek, today } from '../../../helpers/date-manipulation-functions'

export const HabitView: FunctionComponent<{
    type?: 'daily' | 'weekly'
    onOpen: () => void
}> = ({ type, onOpen }) => {
    const { activeHabits, loading, errorFetching } =
        useGetAllActiveHabitsByType(type!)

    if (loading) return <Spinner mt={8} text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} size='sm' />

    if (activeHabits.length === 0)
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

    return (
        <Flex mt={8} gap={8}>
            <Progress
                dailyHabitsLength={activeHabits.length}
                completedHabitsLength={completedHabits.length}
                incompletedHabits={incompletedHabits}
            />
            <VStack flexGrow={1} align='flex-start'>
                <IncompletedHabits
                    incompletedHabits={incompletedHabits}
                    type={type!}
                />
                <CompletedHabits completedHabits={completedHabits} />
            </VStack>
        </Flex>
    )
}
