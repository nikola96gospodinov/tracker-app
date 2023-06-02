import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useToast
} from '@chakra-ui/react'

import { HABITS } from '../../constants/habitsConstants'
import { Habit } from '../../types/habits.types'
import { removeHabitFromGoalsOnDelete } from '../../features/Habits/helpers'
import { removeDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { removeLastCharacter } from '../../helpers/string-manipulation-functions'
import { useGetRelevantGoals } from '../../hooks/useGetRelevantGoals'
import { Doc } from '../../types/crud-opearations.types'
import { UserContext } from '../../context/userContext'
import { FormError } from '../Form/FormError'
import { ArchiveGoal } from '../../features/Goal/ArchiveGoal'
import { GOALS, MILESTONES } from '../../constants/goalsConstants'
import { Goal, Milestone } from '../../types/goals.types'
import useGetFilteredDocs from '../../hooks/useGetFilteredDocs'
import { deleteMilestonesFromDeletedGoal } from '../../features/Goal/Milestones/helpers/crud-operations-milestones'
import { Spinner } from '../UIElements/Spinner'

interface Props<T> {
    isDeleteWarningOpen: boolean
    onDeleteWarningClose: () => void
    path: string
    doc?: T
    customHandleDelete?: () => void
    customHandleCancel?: () => void
    noRedirect?: boolean
    toastSuccessMessage?: string
    toastErrorMessage?: string
}

const DeleteDoc = <T extends Doc>({
    isDeleteWarningOpen,
    onDeleteWarningClose,
    doc,
    path,
    customHandleDelete,
    customHandleCancel,
    noRedirect,
    toastSuccessMessage,
    toastErrorMessage
}: Props<T>) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const router = useRouter()
    const [error, setError] = useState(false)
    const singularPath = removeLastCharacter(path)
    const { relevantGoals, loading: goalsLoading } = useGetRelevantGoals({
        habitID: doc?.id ?? '',
        habitType: doc?.hasOwnProperty('type') ? (doc as Habit).type : 'daily'
    })
    const { docs: relevantMilestones, loading: milestonesLoading } =
        useGetFilteredDocs<Milestone>({
            path: MILESTONES,
            fieldPath: 'goalID',
            opStr: '==',
            value: doc?.id ?? ''
        })

    const handleDelete = () => {
        removeDoc({
            path,
            orgDoc: doc!,
            userID: userId,
            router,
            setError,
            noRedirect,
            toast,
            toastSuccessMessage,
            toastErrorMessage
        })

        if (path === HABITS && relevantGoals) {
            removeHabitFromGoalsOnDelete({
                userID: userId,
                relevantGoals,
                habitID: doc?.id ?? ''
            })
        }

        if (path === GOALS && relevantMilestones) {
            deleteMilestonesFromDeletedGoal({
                userId,
                milestones: relevantMilestones
            })
        }
    }

    const showArchiveGoal =
        path === GOALS && (doc as Goal)?.status !== 'archived'
    const loading = goalsLoading || milestonesLoading

    return (
        <Modal
            isOpen={isDeleteWarningOpen}
            onClose={onDeleteWarningClose}
            isCentered={true}
            size='lg'
        >
            <ModalOverlay backdropFilter='blur(10px)' />
            <ModalContent
                borderRadius='xl'
                p={12}
                pt={showArchiveGoal ? 16 : 12}
                bg='neutral.50'
            >
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <ModalBody>
                            <Text fontSize='xl' textAlign='center'>
                                Are you sure you want to <b>delete</b> the{' '}
                                {singularPath}?
                            </Text>
                        </ModalBody>
                        <ModalFooter
                            alignItems='center'
                            justifyContent='center'
                            gap={4}
                        >
                            <Button
                                onClick={customHandleDelete ?? handleDelete}
                                variant='delete'
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={
                                    customHandleCancel ?? onDeleteWarningClose
                                }
                                variant='tertiary'
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
                <FormError
                    formError={error}
                    errorText={`There was an issue deleting ${singularPath}. Please try again`}
                />
                {showArchiveGoal && (
                    <ArchiveGoal
                        onClose={onDeleteWarningClose}
                        goalId={doc?.id ?? ''}
                    />
                )}
            </ModalContent>
        </Modal>
    )
}

export default DeleteDoc
