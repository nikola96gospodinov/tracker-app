import React from 'react'
import Image from 'next/image'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { formatDateForUI } from '../../../../helpers/date-manipulation-functions'
import { capitalizeFirstLetter } from '../../../../helpers/string-manipulation-functions'
import { goalsIcons } from '../../data'
import { Goal } from '../../goals.types'
import { Dispatch } from '../../../../typings'
import CalendarIcon from '../../../../components/Icons/CalendarIcon'
import { CategoryPill } from '../../features/CategoryPill'
import { DocActions } from '../../../../components/Docs/DocActions'

const GoalInfo: React.FunctionComponent<{
    goal: Goal
    onEditFormOpen: () => void
    onDeleteWarningOpen: () => void
}> = ({ goal, onEditFormOpen, onDeleteWarningOpen }) => {
    const icon = goalsIcons[goal.category as keyof typeof goalsIcons]
    const deadline = goal.deadline ? formatDateForUI(goal.deadline) : 'N/A'

    return (
        <Stack>
            <Flex alignItems='center' justifyContent='space-between'>
                <CategoryPill>
                    <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={24}
                        height={24}
                        style={{ scale: '0.75' }} // Next.js Image being strange
                    />
                    <Text pr={8}>{capitalizeFirstLetter(goal.category)}</Text>
                    <CalendarIcon color='purple.500' boxSize={5} />
                    <Text>{deadline}</Text>
                </CategoryPill>
                <DocActions
                    editAction={onEditFormOpen}
                    deleteAction={onDeleteWarningOpen}
                />
            </Flex>
            <Heading as='h1' fontSize='3xl' pt={6} pb={2}>
                {goal.name}
            </Heading>
            <Text fontSize='xl'>{goal.description}</Text>
        </Stack>
    )
}

export default GoalInfo
