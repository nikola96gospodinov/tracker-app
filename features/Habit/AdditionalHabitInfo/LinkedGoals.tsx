import { FunctionComponent, useContext } from 'react'
import { Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { Habit } from '../../../types/habits.types'
import { useGetRelevantGoals } from '../../../hooks/useGetRelevantGoals'
import { GoalBox } from '../../Goal/GoalBox'
import { Goal } from '../../../types/goals.types'
import { Spinner } from '../../../components/UIElements/Spinner'
import { onKeystoneStatusChange } from '../../Habits/helpers/crud-operations'
import { UserContext } from '../../../context/userContext'

export const LinkedGoals: FunctionComponent<{
    habit: Habit
    onOpen: () => void
}> = ({ habit, onOpen }) => {
    const { userId } = useContext(UserContext)
    const { isGoals, relevantGoals, loading } = useGetRelevantGoals({
        habitID: habit.id,
        habitType: habit.type
    })

    if (loading) return <Spinner text='Loading...' mt={8} />

    if (!isGoals && !habit.isKeystone)
        return (
            <VStack mt={8} fontSize='lg' ml={4} align='flex-start'>
                <Text fontSize='xl' fontWeight={600}>
                    You haven&apos;t attached this habit to any of your goals.
                    🤨
                </Text>
                <Text color='neutral.800'>
                    If you want this habit to appear on your dashboard either:
                </Text>
                <Flex gap={2}>
                    <Button
                        onClick={onOpen}
                        size='sm'
                        mt={4}
                        boxShadow='secondary'
                    >
                        Add habit to any goal
                    </Button>
                    <Button
                        variant='tertiary'
                        size='sm'
                        mt={4}
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
                </Flex>
            </VStack>
        )

    if (!isGoals && habit.isKeystone)
        return (
            <VStack mt={8} fontSize='lg' ml={4} align='flex-start'>
                <Text fontSize='xl' fontWeight={600}>
                    This is a keystone habit 🪨
                </Text>
                <Text color='neutral.800'>
                    Keystone habits don&apos;t need to be linked to goals in
                    order to appear on your dashboard.
                </Text>
                <Flex gap={2}>
                    <Button
                        mt={2}
                        size='sm'
                        boxShadow='secondary'
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
                    <Button
                        mt={2}
                        size='sm'
                        variant='tertiary'
                        onClick={onOpen}
                    >
                        Add to a goal anyway
                    </Button>
                </Flex>
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
