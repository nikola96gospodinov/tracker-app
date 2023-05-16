import { FunctionComponent, useContext } from 'react'
import { Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { Habit } from '../../../habits.types'
import { useGetRelevantGoals } from '../../../../../hooks/useGetRelevantGoals'
import { GoalBox } from '../../../../../features/GoalBox'
import { Goal } from '../../../../goals/goals.types'
import { Spinner } from '../../../../../components/UIElements/Spinner'
import { onKeystoneStatusChange } from '../../../helpers'
import { UserContext } from '../../../../../context/userContext'
import { Link } from '../../../../../components/UIElements/Link'

export const LinkedGoals: FunctionComponent<{ habit: Habit }> = ({ habit }) => {
    const { userId } = useContext(UserContext)
    const { isGoals, relevantGoals, loading } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    if (loading) return <Spinner text='Loading...' mt={8} />

    if (!isGoals && !habit.isKeystone)
        return (
            <VStack mt={8} fontSize='lg' ml={4} align='flex-start'>
                <Text fontSize='2xl'>
                    You haven&apos;t attached this habit to any of your goals.
                    🤨
                </Text>
                <Text color='neutral.800'>
                    If you want this habit to appear on your dashboard either:
                </Text>
                <Flex gap={2}>
                    <Button
                        size='sm'
                        mt={4}
                        boxShadow='secondary'
                        onClick={() =>
                            onKeystoneStatusChange({
                                userId,
                                habitId: habit.id,
                                isKeystone: habit.isKeystone
                            })
                        }
                    >
                        Make this a keystone habit
                    </Button>
                    <Link href='/goals' size='sm' variant='tertiary' mt={4}>
                        Add it to any goal
                    </Link>
                </Flex>
            </VStack>
        )

    if (!isGoals && habit.isKeystone)
        return (
            <VStack mt={8} fontSize='lg' ml={4} align='flex-start'>
                <Text fontSize='2xl'>🪨 This is a keystone habit</Text>
                <Text pb={2} color='neutral.800'>
                    Keystone habits don&apos;t need to be linked to goals in
                    order to appear on your dashboard.
                </Text>
                <Button
                    variant='tertiary'
                    size='sm'
                    onClick={() =>
                        onKeystoneStatusChange({
                            userId,
                            habitId: habit.id,
                            isKeystone: habit.isKeystone
                        })
                    }
                >
                    Remove from keystone habits
                </Button>
            </VStack>
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
