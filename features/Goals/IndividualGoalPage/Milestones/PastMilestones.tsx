import { useState, useMemo } from 'react'

import { Milestone } from '../../goals.types'

import styles from '../../goal.module.scss'
import { formatDateForUI } from '../../../../helpers/date-manipulation-functions'
import EditIcon from '../../../../components/Icons/EditIcon'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'
import Checkbox from '../../../../components/Form/Checkbox'
import SaveIcon from '../../../../components/Icons/SaveIcon'
import CloseIcon from '../../../../components/Icons/CloseIcon'

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
                const formattedDeadline =
                    milestone.deadline === ''
                        ? 'N/A'
                        : formatDateForUI(milestone.deadline)

                return (
                    <tr key={milestone.id} className={trClass}>
                        <td>
                            <Checkbox
                                onClick={() => handleToggle(milestone)}
                                checked
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
                                    <SaveIcon
                                        onClick={() =>
                                            handleEdit(
                                                name ?? milestone.name,
                                                deadline ?? milestone.deadline
                                            )
                                        }
                                    />
                                    <CloseIcon onClick={handleCancelClick} />
                                </>
                            ) : (
                                <>
                                    <EditIcon
                                        onClick={() =>
                                            handleEditClick(milestone)
                                        }
                                    />
                                    <DeleteIcon
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
