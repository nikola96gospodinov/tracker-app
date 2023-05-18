import { FunctionComponent, useCallback, useContext } from 'react'
import { Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react'
import moment from 'moment'

import { Milestone } from '../../goals/goals.types'
import CalendarIcon from '../../../components/Icons/CalendarIcon'
import { formatDateForUI } from '../../../helpers/date-manipulation-functions'
import DangerIcon from '../../../components/Icons/DangerIcon'
import { getProgressForUI } from '../../goals/[goalUrl]/features/Milestones/helpers/utils'
import { AttachedGoal } from './AttachedGoal'
import { UpdateMetrics } from '../../../features/UpdateMetrics/UpdateMetrics'
import { UserContext } from '../../../context/userContext'
import {
    editMilestone,
    toggleMilestone
} from '../../goals/[goalUrl]/features/Milestones/helpers/crud-operations-milestones'

export const MilestoneBox: FunctionComponent<{
    milestone: Milestone
    toast: any
}> = ({ milestone, toast }) => {
    const { userId } = useContext(UserContext)

    const deadline =
        milestone.deadline || milestone.deadline !== ''
            ? formatDateForUI(milestone.deadline)
            : 'N/A'
    const isPastDeadline = moment(milestone.deadline).isBefore(moment())
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

            <Flex align='center' gap={1} mt={2}>
                <CalendarIcon /> <Text>{deadline}</Text>{' '}
                {isPastDeadline && (
                    <Tooltip label='Past the deadline'>
                        <Text as='span'>
                            <DangerIcon color='red.600' />
                        </Text>
                    </Tooltip>
                )}
            </Flex>
        </Box>
    )
}
