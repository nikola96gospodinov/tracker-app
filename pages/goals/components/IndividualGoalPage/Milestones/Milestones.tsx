import React, { useMemo, useCallback, useState } from 'react'
import { useAuthUser } from '@react-query-firebase/auth'

import EmptyContent from '../EmptyContent'
import useGetDocs from '../../../../../hooks/useGetDoc'
import { auth } from '../../../../../firebase/firebase'
import { Milestone } from '../../../types'
import {
    deleteMilestone,
    toggleMilestone,
    editMilestone
} from '../../../helpers/crud-operations-milestones'
import {
    Errors,
    TableHeader,
    PastMilestones,
    UpcomingMilestones,
    AddMilestone,
    DeleteModal
} from './components'
import { MILESTONES_CAPITALIZED } from '../GoalConfiguration'
import { MILESTONES } from '../../../constants'
import { TabElementProps } from '../types'

import styles from '../../goal.module.scss'

const Milestones = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab
}: TabElementProps) => {
    const { data: user } = useAuthUser(['user'], auth)
    const { docs: milestones, errorFetching } = useGetDocs<Milestone>({
        userID: user?.uid ?? '',
        path: MILESTONES
    })
    const [activeMilestone, setActiveMilestone] = useState<Milestone>()
    const [errorDeleting, setErrorDeleting] = useState(false)
    const [errorToggling, setErrorToggling] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [errorUpdating, setErrorUpdating] = useState(false)

    const relevantMilestones = useMemo(
        () =>
            milestones?.filter((milestone) => milestone.goalID === goalID) ??
            [],
        [milestones, goalID]
    )

    const handleDeleteWarning = useCallback((milestone: Milestone) => {
        setActiveMilestone(milestone)
        setDeleteWarning(true)
    }, [])

    const handleDelete = useCallback(() => {
        deleteMilestone({
            userID: user?.uid ?? '',
            milestones: milestones ?? [],
            milestone: activeMilestone!,
            setErrorDeleting
        })
        setDeleteWarning(false)
    }, [milestones, user?.uid, activeMilestone])

    const handleToggle = useCallback(
        (milestone: Milestone) => {
            toggleMilestone({
                userID: user?.uid ?? '',
                milestones: milestones ?? [],
                milestone,
                setErrorToggling
            })
        },
        [milestones, user?.uid]
    )

    const handleEditClick = useCallback((milestone: Milestone) => {
        setActiveMilestone(milestone)
    }, [])

    const handleEdit = useCallback(
        (name: string, deadline: string | undefined) => {
            const updatedMilestone = {
                ...activeMilestone,
                name,
                deadline
            } as Milestone

            editMilestone({
                userID: user?.uid ?? '',
                milestones: milestones ?? [],
                updatedMilestone,
                setActiveMilestone,
                setErrorUpdating
            })
        },
        [activeMilestone, milestones, user?.uid]
    )

    const handleCancelClick = useCallback(() => {
        setActiveMilestone(undefined)
    }, [])

    if (errorFetching) {
        return (
            <p>
                We had problem getting your milestones... Please refresh the
                page
            </p>
        )
    }

    const displayEmptyContent =
        relevantMilestones?.length === 0 && !newElementAdded
    const displayContent =
        (relevantMilestones?.length ?? 0) > 0 || newElementAdded
    const displayAddMilestone =
        newElementAdded && activeTab === MILESTONES_CAPITALIZED

    return (
        <>
            {displayEmptyContent && <EmptyContent shortName={shortName} />}

            {displayContent && (
                <>
                    <Errors
                        errorDeleting={errorDeleting}
                        errorToggling={errorToggling}
                        errorUpdating={errorUpdating}
                    />
                    <table className={styles.milestonesTable}>
                        <TableHeader />
                        <PastMilestones
                            relevantMilestones={relevantMilestones}
                            handleToggle={handleToggle}
                            handleDeleteWarning={handleDeleteWarning}
                            handleEditClick={handleEditClick}
                            activeMilestone={activeMilestone}
                            handleCancelClick={handleCancelClick}
                            handleEdit={handleEdit}
                        />
                        <UpcomingMilestones
                            relevantMilestones={relevantMilestones}
                            handleToggle={handleToggle}
                            handleDeleteWarning={handleDeleteWarning}
                            handleEditClick={handleEditClick}
                            activeMilestone={activeMilestone}
                            handleCancelClick={handleCancelClick}
                            handleEdit={handleEdit}
                        />
                        {displayAddMilestone && (
                            <AddMilestone
                                setNewElementAdded={setNewElementAdded}
                                goalID={goalID}
                                userID={user?.uid ?? ''}
                                milestones={relevantMilestones}
                            />
                        )}
                    </table>
                </>
            )}

            {deleteWarning && (
                <DeleteModal
                    handleDelete={handleDelete}
                    setDeleteWarning={setDeleteWarning}
                    errorDeleting={errorDeleting}
                    setActiveMilestone={setActiveMilestone}
                />
            )}
        </>
    )
}

export default Milestones
