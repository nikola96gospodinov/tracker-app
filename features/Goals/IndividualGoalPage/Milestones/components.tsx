import { useState, useMemo, useRef, useCallback } from 'react'
import { AiOutlineLoading3Quarters, AiTwotoneEdit } from 'react-icons/ai'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { MdErrorOutline } from 'react-icons/md'
import { RiSaveFill, RiCloseCircleFill, RiDeleteBin6Fill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'

import { addMilestone } from '../../../../pages/goals/helpers/crud-operations-milestones'
import { Milestone } from '../../../../pages/goals/types'

import styles from '../../goal.module.scss'

export const Errors: React.FunctionComponent<{
    errorDeleting: boolean
    errorToggling: boolean
    errorUpdating: boolean
}> = ({ errorDeleting, errorToggling, errorUpdating }) => (
    <>
        {errorDeleting && (
            <div className='form-error'>
                <MdErrorOutline />
                <span>
                    There was an error deleting the milestone. Please try again
                </span>
            </div>
        )}
        {errorToggling && (
            <div className='form-error'>
                <MdErrorOutline />
                <span>
                    There was an error changing the milestone. Please try again
                </span>
            </div>
        )}
        {errorUpdating && (
            <div className='form-error'>
                <MdErrorOutline />
                <span>
                    There was an error updating the milestone. Please try again
                </span>
            </div>
        )}
    </>
)

export const TableHeader = () => (
    <>
        <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '15%' }} />
        </colgroup>
        <tr>
            <th>
                <AiOutlineLoading3Quarters />
            </th>
            <th>
                <span>Name</span>
            </th>
            <th>
                <span>Deadline</span>
            </th>
            <th></th>
        </tr>
    </>
)

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

                return (
                    <tr
                        key={milestone.id}
                        className={
                            isActiveMilestone
                                ? styles.newMilestone
                                : styles.pastMilestone
                        }
                    >
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
                console.log(milestone)

                return (
                    <tr
                        key={milestone.id}
                        className={
                            isActiveMilestone
                                ? styles.newMilestone
                                : styles.upcomingMilestones
                        }
                    >
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

export const AddMilestone: React.FunctionComponent<{
    setNewElementAdded: React.Dispatch<React.SetStateAction<boolean>>
    goalID: string
    userID: string
    milestones: Milestone[]
}> = ({ setNewElementAdded, goalID, userID, milestones }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const deadlineRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState(false)
    const [submitError, setSubmitError] = useState(false)

    const onDelete = useCallback(() => {
        if (nameRef.current) nameRef.current.value = ''
        if (deadlineRef.current) deadlineRef.current.value = ''
        setNewElementAdded(false)
    }, [setNewElementAdded])

    const onSave = useCallback(() => {
        if (nameRef.current?.value === '' || !nameRef.current?.value) {
            setError(true)
        } else {
            const newMilestone = {
                id: uuidv4(),
                goalID,
                name: nameRef.current.value,
                completed: false,
                deadline: deadlineRef.current?.value ?? ''
            } as Milestone
            addMilestone({
                newMilestone,
                userID,
                milestones,
                setSubmitError
            })
            if (!submitError) {
                setNewElementAdded(false)
                nameRef.current.value = ''
                deadlineRef.current!.value = ''
            }
        }
    }, [])

    return (
        <tr className={styles.newMilestone}>
            <td>
                <ImCheckboxUnchecked style={{ marginRight: 0 }} />
            </td>
            <td style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <input type='text' ref={nameRef} />
                {error && (
                    <span style={{ marginBottom: '0' }} className='field-error'>
                        Please fill in this field
                    </span>
                )}
                {submitError && (
                    <span style={{ marginBottom: '0' }} className='field-error'>
                        There was an error adding the milestone. Please try
                        again
                    </span>
                )}
            </td>
            <td>
                <input type='date' ref={deadlineRef} />
            </td>
            <td>
                <RiSaveFill className={styles.save} onClick={onSave} />{' '}
                <RiDeleteBin6Fill
                    className={styles.delete}
                    onClick={onDelete}
                />
            </td>
        </tr>
    )
}

export const DeleteModal: React.FunctionComponent<{
    handleDelete: () => void
    setDeleteWarning: React.Dispatch<React.SetStateAction<boolean>>
    errorDeleting: boolean
    setActiveMilestone: React.Dispatch<
        React.SetStateAction<Milestone | undefined>
    >
}> = ({
    handleDelete,
    setDeleteWarning,
    errorDeleting,
    setActiveMilestone
}) => {
    return (
        <div className='backdrop'>
            <div className='form-container'>
                <p style={{ fontSize: '1.125rem', textAlign: 'center' }}>
                    Are you sure you want to <b>delete</b> the goal?
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gridGap: '1rem',
                        marginTop: '2rem'
                    }}
                >
                    <button
                        className='button button-delete'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className='button button-tertiary'
                        onClick={() => {
                            setDeleteWarning(false)
                            setActiveMilestone(undefined)
                        }}
                    >
                        Cancel
                    </button>
                </div>
                {errorDeleting && (
                    <p className='form-error' style={{ marginTop: '1.5rem' }}>
                        There was an error deleting the goal. Please try again
                    </p>
                )}
            </div>
        </div>
    )
}
