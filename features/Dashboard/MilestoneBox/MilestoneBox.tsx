import { FunctionComponent } from 'react'
import { Box, Heading, VStack } from '@chakra-ui/react'

import { Milestone } from '../../../types/goals.types'
import { AttachedGoal } from './AttachedGoal'
import { Deadline } from '../../Deadline'
import { UpdateMilestoneMetrics } from '../../UpdateMetrics/UpdateMilestoneMetrics'

export const MilestoneBox: FunctionComponent<{
    milestone: Milestone
}> = ({ milestone }) => (
    <VStack
        bg='white'
        p={4}
        borderRadius='lg'
        boxShadow='inset'
        borderLeft='solid'
        borderLeftColor='purple.600'
        borderLeftWidth={3}
        align='flex-start'
        justify='space-between'
    >
        <Box>
            <AttachedGoal goalId={milestone.goalID} />
            <Heading as='h3' fontSize='lg' mt={2}>
                {milestone.name}
            </Heading>
        </Box>

        <VStack mt={2} align='flex-start'>
            <UpdateMilestoneMetrics
                milestone={milestone}
                toggleText='Set as completed'
            />

            <Deadline deadline={milestone.deadline} />
        </VStack>
    </VStack>
)
