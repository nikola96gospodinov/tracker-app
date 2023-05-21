import { Td, Flex, Checkbox } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { Milestone } from '../../../../types/goals.types'

export const ToggleCell: FunctionComponent<{
    milestone: Milestone
    handleToggle: (milestone: Milestone) => void
}> = ({ milestone, handleToggle }) => {
    return (
        <Td>
            <Flex alignContent='center' justifyContent='center'>
                <Checkbox
                    onChange={() => handleToggle(milestone)}
                    isChecked={milestone.completed}
                />
            </Flex>
        </Td>
    )
}
