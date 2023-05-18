import React from 'react'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { Goal } from '../../goals.types'
import { Pill } from '../../../../components/Pill'
import { DocActions } from '../../../../components/Docs/DocActions'
import { Deadline } from '../../../../features/Deadline'
import { UpdateGoalMetrics } from './UpdateGoalMetrics'

const GoalInfo: React.FunctionComponent<{
    goal: Goal
    onEditFormOpen: () => void
    onDeleteWarningOpen: () => void
}> = ({ goal, onEditFormOpen, onDeleteWarningOpen }) => (
    <Stack>
        <Flex alignItems='center' justifyContent='space-between'>
            <Pill>
                {/* Maybe to use later */}
                {/* <MilestonesHit goalId={goal.id} /> */}
                <Deadline deadline={goal.deadline} />
                <UpdateGoalMetrics goal={goal} />
            </Pill>
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

export default GoalInfo
