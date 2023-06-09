import { SimpleGrid } from '@chakra-ui/react'

import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { Spinner } from '../../../components/UIElements/Spinner'
import useGetDocs from '../../../hooks/useGetDocs'
import { HABITS } from '../../../constants/habitsConstants'
import { Habit } from '../../../types/habits.types'
import { HabitBox } from './HabitBox'
import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { NoFilteredDocs } from '../../../components/Docs/NoFilteredDocs'

const HabitsList: React.FunctionComponent<{
    onAddHabitsFormOpen: () => void
    activeOptionValue: string
}> = ({ onAddHabitsFormOpen, activeOptionValue }) => {
    const { docs: allHabits, errorFetching: errorFetchingAllHabits } =
        useGetDocs<Habit>({
            path: HABITS
        })
    const { docs: habits, errorFetching } = useGetFilteredDocs<Habit>({
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: activeOptionValue
    })

    if (errorFetchingAllHabits || errorFetching)
        return <ErrorFetchingDocs docType={HABITS} />

    if (!allHabits || !habits) return <Spinner text='Loading...' />

    if (allHabits.length === 0)
        return (
            <NoDocsYet docType={HABITS} onClick={() => onAddHabitsFormOpen()} />
        )

    if (habits.length === 0 && activeOptionValue !== 'all')
        return <NoFilteredDocs docType={HABITS} />

    return (
        <SimpleGrid
            columns={3}
            spacing={6}
            minChildWidth='300px'
            templateColumns='1fr 1fr 1fr'
        >
            {(activeOptionValue === 'all' ? allHabits : habits).map(
                (habit: Habit) => (
                    <HabitBox key={habit.id} habit={habit} />
                )
            )}
        </SimpleGrid>
    )
}

export default HabitsList
