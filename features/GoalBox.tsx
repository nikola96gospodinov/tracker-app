import { useState } from 'react'
import Image from 'next/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import { Goal } from '../pages/goals/goals.types'
import { goalsIcons } from '../pages/goals/data'
import { capitalizeFirstLetter } from '../helpers/string-manipulation-functions'
import { formatDateForUI } from '../helpers/date-manipulation-functions'
import EditIcon from '../components/Icons/EditIcon'
import CalendarIcon from '../components/Icons/CalendarIcon'
import { Link } from '../components/UIElements/Link'
import { CategoryPill } from '../pages/goals/features/CategoryPill'

export const GoalBox: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const [showEditIcon, setShowEditIcon] = useState(false)

    const icon = goalsIcons[goal.category as keyof typeof goalsIcons]
    const deadline = goal.deadline ? formatDateForUI(goal.deadline) : 'N/A'
    const category = capitalizeFirstLetter(goal.category)

    return (
        <Link
            href={`/goals/${goal.urlPath}`}
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
            bg='white'
            color='purple.600'
            p={6}
            borderRadius='2xl'
            transition='0.2s ease'
            position='relative'
            boxShadow='inset'
            fontWeight={500}
            fontSize='md'
            _hover={{
                borderTop: 'solid',
                borderWidth: 4,
                borderColor: 'purple.600'
            }}
        >
            {showEditIcon && (
                <EditIcon
                    position='absolute'
                    top={4}
                    right={4}
                    boxSize={5}
                    transition='0.1s ease'
                    _hover={{
                        transform: 'scale(0.9)'
                    }}
                />
            )}
            <CategoryPill>
                <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={24}
                    height={24}
                    style={{ scale: '0.75' }} // Next.js Image being strange
                />
                <Text>{category}</Text>
            </CategoryPill>
            <Box mt={3} color='neutral.900'>
                <Heading as='h3' fontWeight={600} fontSize='xl' mb={1}>
                    {goal.name}
                </Heading>
                <Text>{goal.description}</Text>
                <Flex alignItems='center' gap={1} pt={goal.description ? 2 : 4}>
                    <CalendarIcon />
                    {deadline}
                </Flex>
            </Box>
        </Link>
    )
}
