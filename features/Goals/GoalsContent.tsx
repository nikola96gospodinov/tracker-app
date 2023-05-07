import { useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'

import InitialSection from '../../components/InitialSection'
import GoalForm from './GoalForm'
import GoalsList from './GoalsList/GoalsList'
import { UserContext } from '../../context/userContext'
import { DocHeader } from '../../components/Docs/DocHeader'

export const GoalsContent = () => {
    const { userId } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <InitialSection>
                <DocHeader heading='My Goals' onClick={onOpen} />
                {userId && (
                    <GoalsList userID={userId} setAddGoalsFormOpen={onOpen} />
                )}
                {isOpen && userId && (
                    <GoalForm isFormOpen={isOpen} onFormClose={onClose} />
                )}
            </InitialSection>
        </>
    )
}
