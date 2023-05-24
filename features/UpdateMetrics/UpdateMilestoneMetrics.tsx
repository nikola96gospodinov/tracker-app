import { FunctionComponent, useCallback, useContext } from 'react'
import { useToast } from '@chakra-ui/react'

import { UpdateMetrics } from './UpdateMetrics'
import { Milestone } from '../../types/goals.types'
import { UserContext } from '../../context/userContext'
import {
    editMilestone,
    toggleMilestone
} from '../Goal/Milestones/helpers/crud-operations-milestones'
import { getProgressForUI } from '../Goal/Milestones/helpers/utils'
import { today } from '../../helpers/date-manipulation-functions'

export const UpdateMilestoneMetrics: FunctionComponent<{
    milestone: Milestone
    toggleText: string
}> = ({ milestone, toggleText }) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const progress = getProgressForUI(milestone)

    const onProgressChange = useCallback(
        (progress: number, target: number) => {
            const completed = progress >= target
            editMilestone({
                userID: userId ?? '',
                updatedMilestone: {
                    ...milestone,
                    progress,
                    target,
                    completed,
                    completedOn: completed ? today : ''
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
        <UpdateMetrics
            toggleText={toggleText}
            onToggleChange={onToggleChange}
            onProgressChange={onProgressChange}
            isCompleted={milestone.completed}
            target={milestone.target}
            progress={milestone.progress}
            progressText={progress}
        />
    )
}
