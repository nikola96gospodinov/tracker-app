import React, { useCallback, useState } from 'react'

import EmptyContent from '../EmptyContent'
import { Milestone } from '../../goals.types'
import {
    deleteMilestone,
    toggleMilestone,
    editMilestone
} from './helpers/crud-operations-milestones'
import { MILESTONES, MILESTONES_CAPITALIZED } from '../../constants'
import { TabElementProps } from '../../goals.types'

import styles from '../../goal.module.scss'
import { AddMilestone } from './AddMilestone'
import { DeleteModal } from './DeleteModal'
import { PastMilestones } from './PastMilestones'
import { TableHeader } from './TableHeader'
import { UpcomingMilestones } from './UpcomingMilestones'
import useUserLogged from '../../../../hooks/useUserLogged'
import useGetFilteredDocs from '../../../../hooks/useGetFilteredDocs'

const Milestones: React.FunctionComponent<TabElementProps> = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab
}) => {
    const { user } = useUserLogged()
    const { docs: milestones, errorFetching } = useGetFilteredDocs<Milestone>({
        userID: user?.uid ?? '',
        path: MILESTONES,
        fieldPath: 'goalID',
        opStr: '==',
        value: goalID
    })
    const [activeMilestone, setActiveMilestone] = useState<Milestone>()
    const [deleteWarning, setDeleteWarning] = useState(false)

    const handleDeleteWarning = useCallback((milestone: Milestone) => {
        setActiveMilestone(milestone)
        setDeleteWarning(true)
    }, [])

    const handleDelete = useCallback(() => {
        deleteMilestone({
            userID: user?.uid ?? '',
            milestone: activeMilestone!
        })
        setDeleteWarning(false)
    }, [milestones, user?.uid, activeMilestone])

    const handleToggle = useCallback(
        (milestone: Milestone) => {
            toggleMilestone({
                userID: user?.uid ?? '',
                milestone
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
                updatedMilestone,
                setActiveMilestone
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
                We had a problem getting your milestones... Please refresh the
                page
            </p>
        )
    }

    const displayEmptyContent = milestones?.length === 0 && !newElementAdded
    const displayContent =
        (milestones && milestones?.length > 0) || newElementAdded
    const displayAddMilestone =
        newElementAdded && activeTab === MILESTONES_CAPITALIZED

    return (
        <>
            {displayEmptyContent && <EmptyContent shortName={shortName} />}

            {displayContent && (
                <>
                    <table className={styles.milestonesTable}>
                        <TableHeader />
                        <PastMilestones
                            relevantMilestones={milestones ?? []}
                            handleToggle={handleToggle}
                            handleDeleteWarning={handleDeleteWarning}
                            handleEditClick={handleEditClick}
                            activeMilestone={activeMilestone}
                            handleCancelClick={handleCancelClick}
                            handleEdit={handleEdit}
                        />
                        <UpcomingMilestones
                            relevantMilestones={milestones ?? []}
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
                            />
                        )}
                    </table>
                </>
            )}

            {deleteWarning && (
                <DeleteModal
                    handleDelete={handleDelete}
                    setDeleteWarning={setDeleteWarning}
                    setActiveMilestone={setActiveMilestone}
                />
            )}
        </>
    )
}

export default Milestones
