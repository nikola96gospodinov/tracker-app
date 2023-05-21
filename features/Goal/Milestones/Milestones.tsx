import React, { useCallback, useContext, useState } from 'react'
import {
    Table,
    TableContainer,
    useDisclosure,
    useToast
} from '@chakra-ui/react'

import EmptyContent from '../EmptyContent'
import { Milestone } from '../../../types/goals.types'
import {
    deleteMilestone,
    toggleMilestone,
    editMilestone
} from './helpers/crud-operations-milestones'
import {
    MILESTONES,
    MILESTONES_CAPITALIZED
} from '../../../constants/goalsConstants'
import { TabElementProps } from '../../../types/goals.types'
import { AddMilestone } from './AddMilestone'
import { PastMilestones } from './PastMilestones'
import { TableHeader } from './TableHeader'
import { UpcomingMilestones } from './UpcomingMilestones'
import useGetFilteredDocs from '../../../hooks/useGetFilteredDocs'
import { UserContext } from '../../../context/userContext'
import { Spinner } from '../../../components/UIElements/Spinner'
import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import DeleteDoc from '../../../components/Docs/DeleteDoc'

const Milestones: React.FunctionComponent<TabElementProps> = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab
}) => {
    const { userId } = useContext(UserContext)
    const toast = useToast()
    const {
        docs: milestones,
        errorFetching,
        loading
    } = useGetFilteredDocs<Milestone>({
        path: MILESTONES,
        fieldPath: 'goalID',
        opStr: '==',
        value: goalID
    })
    const [activeMilestone, setActiveMilestone] = useState<Milestone>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteWarning = useCallback((milestone: Milestone) => {
        setActiveMilestone(milestone)
        onOpen()
    }, [])

    const handleDelete = useCallback(() => {
        deleteMilestone({
            userID: userId ?? '',
            milestone: activeMilestone!,
            toast
        })
        onClose()
    }, [milestones, userId, activeMilestone])

    const handleToggle = useCallback(
        (milestone: Milestone) => {
            toggleMilestone({
                userID: userId ?? '',
                milestone,
                toast
            })
        },
        [milestones, userId]
    )

    const handleEditClick = useCallback((milestone: Milestone) => {
        setActiveMilestone(milestone)
    }, [])

    const handleEdit = useCallback(
        (
            name: string,
            deadline: string | undefined,
            target: number | undefined,
            progress: number | undefined
        ) => {
            const updatedMilestone = {
                ...activeMilestone,
                name,
                deadline,
                target,
                progress,
                completed:
                    progress && target
                        ? progress >= target
                        : activeMilestone?.completed
            } as Milestone

            editMilestone({
                userID: userId ?? '',
                updatedMilestone,
                setActiveMilestone,
                toast
            })
        },
        [activeMilestone, userId]
    )

    const handleCancelClick = useCallback(() => {
        setActiveMilestone(undefined)
    }, [])

    if (loading) return <Spinner mt={8} />

    if (errorFetching) return <ErrorFetchingDocs docType={MILESTONES} />

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
                    <TableContainer mt={6}>
                        <Table>
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
                                    userID={userId ?? ''}
                                />
                            )}
                        </Table>
                    </TableContainer>
                </>
            )}

            <DeleteDoc
                path={MILESTONES}
                isDeleteWarningOpen={isOpen}
                onDeleteWarningClose={onClose}
                customHandleDelete={handleDelete}
                customHandleCancel={() => {
                    onClose()
                    setActiveMilestone(undefined)
                }}
            />
        </>
    )
}

export default Milestones
