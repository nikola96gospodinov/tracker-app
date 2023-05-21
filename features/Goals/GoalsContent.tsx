import { useDisclosure } from '@chakra-ui/react'

import InitialSection from '../../components/InitialSection'
import GoalForm from './GoalForm'
import GoalsList from './GoalsList'
import { DocHeader } from '../../components/Docs/DocHeader'

export const GoalsContent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <InitialSection>
                <DocHeader heading='My Goals' onClick={onOpen} />
                <GoalsList setAddGoalsFormOpen={onOpen} />
                <GoalForm isFormOpen={isOpen} onFormClose={onClose} />
            </InitialSection>
        </>
    )
}
