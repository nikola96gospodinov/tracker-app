import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'

import InitialSection from '../../components/InitialSection'
import GoalForm from './GoalForm/GoalForm'
import GoalsList from './GoalsList'
import { DocHeader } from '../../components/Docs/DocHeader'
import { filteringOptions } from './data'

export const GoalsContent = () => {
    const { query } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: !isEmpty(query)
    })
    const initialValue = filteringOptions[1].value
    const [activeOptionValue, setActiveOptionValue] = useState(initialValue)

    return (
        <>
            <InitialSection>
                <DocHeader
                    heading='My Goals'
                    onClick={onOpen}
                    filteringOptions={filteringOptions}
                    activeOptionValue={activeOptionValue}
                    setActiveOptionValue={setActiveOptionValue}
                />
                <GoalsList
                    setAddGoalsFormOpen={onOpen}
                    activeOptionValue={activeOptionValue}
                />
                <GoalForm isFormOpen={isOpen} onFormClose={onClose} />
            </InitialSection>
        </>
    )
}
