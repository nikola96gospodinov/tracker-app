import { FunctionComponent, useCallback, useContext } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { Milestone } from '../../goals/goals.types'
import { getProgressForUI } from '../../goals/[goalUrl]/features/Milestones/helpers/utils'
import { AttachedGoal } from './AttachedGoal'
import { UpdateMetrics } from '../../../features/UpdateMetrics/UpdateMetrics'
import { UserContext } from '../../../context/userContext'
import {
    editMilestone,
    toggleMilestone
} from '../../goals/[goalUrl]/features/Milestones/helpers/crud-operations-milestones'
import { Deadline } from '../../../features/Deadline'

export const MilestoneBox: FunctionComponent<{
    milestone: Milestone
    toast: any
}> = ({ milestone, toast }) => {
    const { userId } = useContext(UserContext)
    const progress = getProgressForUI(milestone)

    const onProgressChange = useCallback(
        (progress: number, target: number) => {
            editMilestone({
                userID: userId ?? '',
                updatedMilestone: {
                    ...milestone,
                    progress,
                    target
                },
                toast
            })
        },
        [milestone, userId]
    )

    const onToggleChange = useCallback(
        () =>
            toggleMilestone({
                userID: userId ?? '',
                milestone,
                toast
            }),
        [milestone, userId]
    )

    return (
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
                <UpdateMetrics
                    toggleText='Set as completed'
                    onToggleChange={onToggleChange}
                    onProgressChange={onProgressChange}
                    isCompleted={milestone.completed}
                    target={milestone.target}
                    progress={milestone.progress}
                    progressText={progress}
                />
            </Box>

            <Box mt={2}>
                <Deadline deadline={milestone.deadline} />
            </Box>
        </Box>
    )
}
