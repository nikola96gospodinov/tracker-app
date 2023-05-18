import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

import InitialSection from '../../../components/InitialSection'
import HabitForm from './HabitForm'
import HabitsList from './HabitList/HabitsList'
import { DocHeader } from '../../../components/Docs/DocHeader'

export const HabitsContent = () => {
    const { query } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: !isEmpty(query)
    })

    return (
        <>
            <InitialSection>
                <DocHeader heading='My Habits' onClick={onOpen} />
                <HabitsList onAddHabitsFormOpen={onOpen} />
                <HabitForm isFormOpen={isOpen} onFormClose={onClose} />
            </InitialSection>
        </>
    )
}
