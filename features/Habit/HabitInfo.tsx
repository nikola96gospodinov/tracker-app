import { Flex, Heading, Text, Tooltip } from '@chakra-ui/react'

import { Habit } from '../../types/habits.types'
import { getCurrentStreak } from '../Habits/helpers'
import { UpdateHabitMetrics } from '../UpdateMetrics/UpdateHabitMetrics/UpdateHabitMetrics'
import { DocActions } from '../../components/Docs/DocActions'
import { AdditionalHabitInfo } from './AdditionalHabitInfo/AdditionalHabitInfo'

const HabitInfo: React.FunctionComponent<{
    habit: Habit
    onEditFormOpen: () => void
    onDeleteWarningOpen: () => void
}> = ({ habit, onEditFormOpen, onDeleteWarningOpen }) => {
    const lastCompleted = habit.currentStreak?.end ?? habit.longestStreak.end

    const currentStreak = getCurrentStreak({
        lastCompleted,
        currentStreak: habit.currentStreak.streak,
        type: habit.type
    })

    const currentStreakTooltipLabel =
        currentStreak === 0
            ? `You're not on an active streak at the momemnt`
            : `You're on a ${currentStreak} ${
                  habit.type === 'daily' ? 'day' : 'week'
              } streak!`

    return (
        <>
            <Flex align='center' justify='space-between'>
                <Flex
                    color='neutral.700'
                    gap={12}
                    bgGradient='linear(to-l, transparent, purple.50)'
                    py={2}
                    px={4}
                    borderRadius={20}
                    align='center'
                >
                    <Text>
                        🎯 {habit.target} {habit.metric} {habit.type}
                    </Text>
                    <UpdateHabitMetrics habit={habit} />
                </Flex>
                <DocActions
                    editAction={onEditFormOpen}
                    deleteAction={onDeleteWarningOpen}
                />
            </Flex>
            <Heading as='h1' fontSize='3xl' mt={8} mb={4} display='flex'>
                {habit.name}
                <Tooltip label={currentStreakTooltipLabel} placement='top'>
                    <Text fontSize='md'>🔥{currentStreak}</Text>
                </Tooltip>
            </Heading>
            <Text fontSize='xl'>{habit.description}</Text>
            <AdditionalHabitInfo habit={habit} />
        </>
    )
}

export default HabitInfo
