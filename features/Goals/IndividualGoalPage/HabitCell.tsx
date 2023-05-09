import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react'

import { Habit } from '../../Habits/habits.types'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    isHabitCompleted
} from '../../Habits/helpers'
import { Link } from '../../../components/UIElements/Link'
import { UpdateHabitMetrics } from '../../Habits/UpdateHabitMetrics'
import { formatDateForUI } from '../../../helpers/date-manipulation-functions'

const HabitCell: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const lastCompleted = habit.currentStreak?.end
    const completed = isHabitCompleted(habit)
    const color = completed ? 'green.500' : 'yellow.500'
    const Icon = getHabitCompletionIcon(completed)
    const currentStreak = getCurrentStreak({
        lastCompleted,
        currentStreak: habit.currentStreak.streak,
        type: habit.type
    })

    const getToolTipLabel = (): string => {
        if (completed && habit.type === 'daily') {
            return 'Completed today'
        }

        if (completed && habit.type === 'weekly') {
            return 'Completed this week'
        }

        if (!completed && habit.type === 'daily') {
            return `Not completed today. Last completed ${
                lastCompleted ? formatDateForUI(lastCompleted) : 'never'
            }`
        }

        if (!completed && habit.type === 'weekly') {
            console.log('lastCompleted', lastCompleted)
            return `Not completed this week. Last completed ${
                lastCompleted ? lastCompleted : 'never'
            }`
        }

        return ''
    }

    return (
        <Box
            p={4}
            boxShadow='inset'
            bg='white'
            borderRadius='2xl'
            borderTop='solid'
            borderTopWidth={3}
            borderTopColor={color}
        >
            <Flex alignItems='center' justifyContent='space-between'>
                <Link
                    variant='link'
                    href={`/habits/${habit.urlPath}`}
                    color='neutral.900'
                    _hover={{ textDecoration: 'none', color: 'purple.600' }}
                >
                    <Heading as='h3' fontSize='lg' fontWeight={600}>
                        {habit.name}
                    </Heading>
                </Link>
                <Text>🔥{currentStreak}</Text>
            </Flex>
            <Text>
                🎯 {habit.target} {habit.metric} {habit.type}
            </Text>
            <Flex alignItems='center' justifyContent='space-between' mt={4}>
                <UpdateHabitMetrics habit={habit} />
                <Tooltip
                    label={getToolTipLabel()}
                    aria-label='A tooltip'
                    placement='right'
                >
                    {/* For the tooltip to work the icon needs to be wrapped in a span */}
                    <Text as='span'>
                        <Icon boxSize={5} color={color} />
                    </Text>
                </Tooltip>
            </Flex>
        </Box>
    )
}

export default HabitCell
