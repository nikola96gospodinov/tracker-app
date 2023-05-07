import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'

import { HABITS } from '../../features/Habits/constants'
import { Habit } from '../../features/Habits/habits.types'
import { removeHabitFromGoalsOnDelete } from '../../features/Habits/helpers'
import { removeDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { removeLastCharacter } from '../../helpers/string-manipulation-functions'
import { useGetRelevantGoals } from '../../hooks/useGetRelevantGoals'
import { Doc } from '../../types/crud-opearations.types'
import { UserContext } from '../../context/userContext'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text
} from '@chakra-ui/react'
import { FormError } from '../Form/FormError'

interface Props<T> {
    isDeleteWarningOpen: boolean
    onDeleteWarningClose: () => void
    doc: T
    path: string
}

const DeleteDoc = <T extends Doc>({
    isDeleteWarningOpen,
    onDeleteWarningClose,
    doc,
    path
}: Props<T>) => {
    const { userId } = useContext(UserContext)
    const router = useRouter()
    const [error, setError] = useState(false)
    const singularPath = removeLastCharacter(path)
    const { relevantGoals } = useGetRelevantGoals({
        habitID: doc.id,
        habitType: doc.hasOwnProperty('type') ? (doc as Habit).type : 'daily'
    })

    const handleDelete = useCallback(() => {
        removeDoc({
            path,
            orgDoc: doc,
            userID: userId,
            router,
            setError
        })

        if (path === HABITS) {
            removeHabitFromGoalsOnDelete({
                userID: userId,
                relevantGoals,
                habitID: doc.id
            })
        }
    }, [doc, path, userId])

    return (
        <Modal
            isOpen={isDeleteWarningOpen}
            onClose={onDeleteWarningClose}
            isCentered={true}
            size='lg'
        >
            <ModalOverlay backdropFilter='blur(10px)' />
            <ModalContent borderRadius='xl' p={12} bg='neutral.50'>
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
                    <Button onClick={handleDelete} variant='delete'>
                        Delete
                    </Button>
                    <Button onClick={onDeleteWarningClose} variant='tertiary'>
                        Cancel
                    </Button>
                </ModalFooter>
                <FormError
                    formError={error}
                    errorText={`There was an issue deleting ${singularPath}. Please try again`}
                />
            </ModalContent>
        </Modal>
    )
}

export default DeleteDoc
