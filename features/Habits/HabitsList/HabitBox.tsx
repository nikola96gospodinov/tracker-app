import { Flex, Heading, Text, Tooltip, VStack } from '@chakra-ui/react'

import { Habit } from '../habits.types'
import { Link } from '../../../components/UIElements/Link'
import {
    getCurrentStreak,
    getHabitCompletionIcon,
    getHabitTooltipLabel,
    isHabitCompleted
} from '../helpers'

export const HabitBox: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const { name, description, target, metric, type, urlPath, currentStreak } =
        habit
    const href = `/habits/${urlPath}`
    const streak = getCurrentStreak({
        lastCompleted: currentStreak.end,
        currentStreak: currentStreak.streak,
        type
    })
    const completed = isHabitCompleted(habit)
    const Icon = getHabitCompletionIcon(completed)
    const iconColor = completed ? 'green.500' : 'red.500'
    const tooltipLabel = getHabitTooltipLabel({
        completed,
        type: habit.type,
        streak
    })

    return (
        <Link
            href={href}
            variant='link'
            bg='white'
            p={6}
            boxShadow='inset'
            borderRadius='2xl'
            color='neutral.900'
            transition='0.2s ease'
            cursor='pointer'
            borderLeft='solid'
            borderLeftColor='purple.500'
            borderLeftWidth={4}
            _hover={{
                transform: 'translateY(4px)'
            }}
        >
            <VStack align='space-between' justify='space-between' h='100%'>
                <Flex alignItems='flex-end' justifyContent='space-between'>
                    <Heading as='h3' fontSize='lg'>
                        {name}
                    </Heading>
                    <Text>🔥{streak}</Text>
                </Flex>
                <Text>{description}</Text>
                <Flex pt={2} alignItems='center' justifyContent='space-between'>
                    <Text>
                        🎯 {target} {metric} {type}
                    </Text>
                    <Tooltip label={tooltipLabel}>
                        <Text as='span' display='flex'>
                            <Icon color={iconColor} />
                        </Text>
                    </Tooltip>
                </Flex>
            </VStack>
        </Link>
    )
}
