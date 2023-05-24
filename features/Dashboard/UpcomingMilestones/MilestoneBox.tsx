import { FunctionComponent } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { Milestone } from '../../../types/goals.types'
import { AttachedGoal } from './AttachedGoal'
import { Deadline } from '../../Deadline'
import { UpdateMilestoneMetrics } from '../../UpdateMetrics/UpdateMilestoneMetrics'

export const MilestoneBox: FunctionComponent<{
    milestone: Milestone
}> = ({ milestone }) => (
    <Box
        bg='white'
        p={4}
        borderRadius='lg'
        boxShadow='inset'
        borderLeft='solid'
        borderLeftColor='purple.600'
        borderLeftWidth={3}
    >
        <AttachedGoal goalId={milestone.goalID} />

        <Heading as='h3' fontSize='lg' mt={2}>
            {milestone.name}
        </Heading>

        <Box mt={2}>
            <UpdateMilestoneMetrics
                milestone={milestone}
                toggleText='Set as completed'
            />
        </Box>

        <Box mt={2}>
            <Deadline deadline={milestone.deadline} />
        </Box>
    </Box>
)
