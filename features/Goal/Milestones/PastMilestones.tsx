import { useState, useMemo } from 'react'
import { Tr } from '@chakra-ui/react'

import { Milestone } from '../../../types/goals.types'
import { trStyles } from './data'
import { ToggleCell } from './Cells/ToggleCell'
import { NameCell } from './Cells/NameCell'
import { DeadlineCell } from './Cells/DeadlineCell'
import { ProgressCell } from './Cells/ProgressCell'
import { ActionsCell } from './Cells/ActionsCell'

export const PastMilestones: React.FunctionComponent<{
    relevantMilestones: Milestone[]
    handleToggle: (milestone: Milestone) => void
    handleDeleteWarning: (milestone: Milestone) => void
    handleEditClick: (milestone: Milestone) => void
    handleCancelClick: () => void
    handleEdit: (
        name: string,
        deadline: string | undefined,
        target: number | undefined,
        progress: number | undefined
    ) => void
    activeMilestone: Milestone | undefined
}> = ({
    relevantMilestones,
    handleToggle,
    handleDeleteWarning,
    handleEditClick,
    handleCancelClick,
    handleEdit,
    activeMilestone
}) => {
    const [name, setName] = useState(activeMilestone?.name)
    const [deadline, setDeadline] = useState(activeMilestone?.deadline)
    const [progress, setProgress] = useState(activeMilestone?.progress)
    const [target, setTarget] = useState(activeMilestone?.target)

    const pastMilestones = useMemo(
        () => relevantMilestones?.filter((milestone) => milestone.completed),
        [relevantMilestones]
    )

    return (
        <>
            {pastMilestones?.map((milestone) => {
                const isActiveMilestone = milestone.id == activeMilestone?.id

                return (
                    <Tr
                        key={milestone.id}
                        {...trStyles}
                        bg={isActiveMilestone ? 'white' : 'none'}
                        opacity={isActiveMilestone ? 1 : 0.5}
                    >
                        <ToggleCell
                            milestone={milestone}
                            handleToggle={handleToggle}
                        />
                        <NameCell
                            milestone={milestone}
                            isActiveMilestone={isActiveMilestone}
                            name={name}
                            setName={setName}
                        />
                        <DeadlineCell
                            milestone={milestone}
                            isActiveMilestone={isActiveMilestone}
                            deadline={deadline}
                            setDeadline={setDeadline}
                        />
                        <ProgressCell
                            milestone={milestone}
                            isActiveMilestone={isActiveMilestone}
                            progress={progress}
                            setProgress={setProgress}
                            target={target}
                            setTarget={setTarget}
                        />
                        <ActionsCell
                            milestone={milestone}
                            isActiveMilestone={isActiveMilestone}
                            handleDeleteWarning={handleDeleteWarning}
                            handleEditClick={handleEditClick}
                            handleCancelClick={handleCancelClick}
                            handleEdit={handleEdit}
                            name={name}
                            deadline={deadline}
                            target={target}
                            progress={progress}
                        />
                    </Tr>
                )
            })}
        </>
    )
}
