import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { useState } from 'react'

import InitialSection from '../../components/InitialSection'
import HabitForm from './HabitForm'
import HabitsList from './HabitsList/HabitsList'
import { DocHeader } from '../../components/Docs/DocHeader'
import { filteringOptions } from './data'

export const HabitsContent = () => {
    const { query } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: !isEmpty(query)
    })
    const initialValue = filteringOptions[0].value
    const [activeOptionValue, setActiveOptionValue] = useState(initialValue)

    return (
        <InitialSection>
            <DocHeader
                heading='My Habits'
                onClick={onOpen}
                filteringOptions={filteringOptions}
                activeOptionValue={activeOptionValue}
                setActiveOptionValue={setActiveOptionValue}
            />
            <HabitsList
                onAddHabitsFormOpen={onOpen}
                activeOptionValue={activeOptionValue}
            />
            <HabitForm isFormOpen={isOpen} onFormClose={onClose} />
        </InitialSection>
    )
}
