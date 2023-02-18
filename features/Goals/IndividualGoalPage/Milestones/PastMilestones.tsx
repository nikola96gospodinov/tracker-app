import { useState, useMemo } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { ImCheckboxChecked } from 'react-icons/im'
import { RiSaveFill, RiCloseCircleFill, RiDeleteBin6Fill } from 'react-icons/ri'

import { Milestone } from '../../goals.types'

import styles from '../../goal.module.scss'

export const PastMilestones: React.FunctionComponent<{
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

    const pastMilestones = useMemo(
        () => relevantMilestones?.filter((milestone) => milestone.completed),
        [relevantMilestones]
    )

    return (
        <>
            {pastMilestones?.map((milestone) => {
                const isActiveMilestone = milestone.id == activeMilestone?.id
                const trClass = isActiveMilestone
                    ? styles.newMilestone
                    : styles.pastMilestone

                return (
                    <tr key={milestone.id} className={trClass}>
                        <td>
                            <ImCheckboxChecked
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
                                <span>
                                    {milestone.deadline === ''
                                        ? 'N/A'
                                        : milestone.deadline}
                                </span>
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
