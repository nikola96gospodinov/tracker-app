import { SimpleGrid } from '@chakra-ui/react'

import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { Spinner } from '../../../components/UIElements/Spinner'
import useGetDocs from '../../../hooks/useGetDocs'
import { HABITS } from '../constants'
import { Habit } from '../habits.types'
import { HabitBox } from './HabitBox'

const HabitsList: React.FunctionComponent<{
    userID: string
    onAddHabitsFormOpen: () => void
}> = ({ userID, onAddHabitsFormOpen }) => {
    const { docs: habits, errorFetching } = useGetDocs<Habit>({
        userID,
        path: HABITS
    })

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} />

    if (!habits) return <Spinner text='Loading...' />

    if (habits.length === 0)
        return (
            <NoDocsYet docType={HABITS} onClick={() => onAddHabitsFormOpen()} />
        )

    return (
        <SimpleGrid
            columns={3}
            spacing={6}
            minChildWidth='300px'
            templateColumns='1fr 1fr 1fr'
        >
            {habits.map((habit: Habit) => (
                <HabitBox key={habit.id} habit={habit} />
            ))}
        </SimpleGrid>
    )
}

export default HabitsList
