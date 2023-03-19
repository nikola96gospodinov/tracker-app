import { useState, useMemo } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { ImCheckboxUnchecked } from 'react-icons/im'
import { RiSaveFill, RiCloseCircleFill, RiDeleteBin6Fill } from 'react-icons/ri'

import { Milestone } from '../../goals.types'

import styles from '../../goal.module.scss'
import { formatDateForUI } from '../../../../helpers/date-manipulation-functions'

export const UpcomingMilestones: React.FunctionComponent<{
    relevantMilestones: Milestone[]
    handleToggle: (milestone: Milestone) => void
    handleDeleteWarning: (milestone: Milestone) => void
    handleEditClick: (milestone: Milestone) => void
    handleCancelClick: () => void
    handleEdit: (name: string, deadline: string | undefined) => void
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

    const upcomingMilestones = useMemo(() => {
        const upcomingMilestonesWithDeadlines =
            relevantMilestones
                ?.filter(
                    (milestone) => !milestone.completed && milestone.deadline
                )
                .sort((a, b) => a.deadline!.localeCompare(b.deadline!)) ?? []
        const upcomingMilestonesWithoutDeadlines =
            relevantMilestones?.filter(
                (milestone) => !milestone.completed && !milestone.deadline
            ) ?? []
        return upcomingMilestonesWithDeadlines.concat(
            upcomingMilestonesWithoutDeadlines
        )
    }, [relevantMilestones])

    return (
        <>
            {upcomingMilestones?.map((milestone) => {
                const isActiveMilestone = milestone.id == activeMilestone?.id
                const trClass = isActiveMilestone
                    ? styles.newMilestone
                    : styles.upcomingMilestones
                const formattedDeadline =
                    milestone.deadline === ''
                        ? 'N/A'
                        : formatDateForUI(milestone.deadline)

                return (
                    <tr key={milestone.id} className={trClass}>
                        <td>
                            <ImCheckboxUnchecked
                                onClick={() => handleToggle(milestone)}
                                style={{ marginRight: 0 }}
                            />
                        </td>
                        <td>
                            {isActiveMilestone ? (
                                <input
                                    value={name ?? milestone.name}
                                    type='text'
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            ) : (
                                <span>{milestone.name}</span>
                            )}
                        </td>
                        <td>
                            {isActiveMilestone ? (
                                <input
                                    value={deadline ?? milestone.deadline}
                                    type='date'
                                    onChange={(e) => {
                                        setDeadline(e.target.value)
                                    }}
                                />
                            ) : (
                                <span>{formattedDeadline}</span>
                            )}
                        </td>
                        <td>
                            {isActiveMilestone ? (
                                <>
                                    <RiSaveFill
                                        onClick={() =>
                                            handleEdit(
                                                name ?? milestone.name,
                                                deadline ?? milestone.deadline
                                            )
                                        }
                                    />
                                    <RiCloseCircleFill
                                        onClick={handleCancelClick}
                                    />
                                </>
                            ) : (
                                <>
                                    <AiTwotoneEdit
                                        onClick={() =>
                                            handleEditClick(milestone)
                                        }
                                    />
                                    <RiDeleteBin6Fill
                                        className={styles.delete}
                                        onClick={() =>
                                            handleDeleteWarning(milestone)
                                        }
                                    />
                                </>
                            )}
                        </td>
                    </tr>
                )
            })}
        </>
    )
}
