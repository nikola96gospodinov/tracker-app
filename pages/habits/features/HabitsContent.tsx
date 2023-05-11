import { useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'

import InitialSection from '../../../components/InitialSection'
import HabitForm from './HabitForm'
import HabitsList from './HabitList/HabitsList'
import { UserContext } from '../../../context/userContext'
import { DocHeader } from '../../../components/Docs/DocHeader'

export const HabitsContent = () => {
    const { userId } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <InitialSection>
                <DocHeader heading='My Habits' onClick={onOpen} />
                {userId && (
                    <HabitsList userID={userId} onAddHabitsFormOpen={onOpen} />
                )}
                {isOpen && userId && (
                    <HabitForm isFormOpen={isOpen} onFormClose={onClose} />
                )}
            </InitialSection>
        </>
    )
}
