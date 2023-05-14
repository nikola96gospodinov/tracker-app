import { FunctionComponent } from 'react'
import { SimpleGrid, Text } from '@chakra-ui/react'

import { Habit } from '../../../habits.types'
import { useGetRelevantGoals } from '../../../../../hooks/useGetRelevantGoals'
import { GoalBox } from '../../../../goals/features/GoalsList/GoalBox'
import { Goal } from '../../../../goals/goals.types'
import { Spinner } from '../../../../../components/UIElements/Spinner'

export const LinkedGoals: FunctionComponent<{ habit: Habit }> = ({ habit }) => {
    const { isGoals, relevantGoals, loading } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    if (loading) return <Spinner text='Loading...' mt={8} />

    if (!isGoals)
        return (
            <Text mt={8} fontSize='lg' ml={4}>
                You haven&apos;t attached this habit to any of your goals.
            </Text>
        )

    return (
        <SimpleGrid
            columns={3}
            spacing={6}
            minChildWidth='300px'
            templateColumns='1fr 1fr 1fr'
            mt={8}
        >
            {relevantGoals?.map((goal: Goal) => (
                <GoalBox key={goal.id} goal={goal} />
            ))}
        </SimpleGrid>
    )
}
