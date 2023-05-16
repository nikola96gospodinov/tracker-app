import { useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

import InitialSection from '../../../components/InitialSection'
import HabitForm from './HabitForm'
import HabitsList from './HabitList/HabitsList'
import { UserContext } from '../../../context/userContext'
import { DocHeader } from '../../../components/Docs/DocHeader'

export const HabitsContent = () => {
    const { query } = useRouter()
    const { userId } = useContext(UserContext)
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: !isEmpty(query)
    })

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
