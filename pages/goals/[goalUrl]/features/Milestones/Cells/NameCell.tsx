import { Td, Text } from '@chakra-ui/react'
import { FunctionComponent, useState } from 'react'
import { inputStyles } from '../data'
import { Input } from '../../../../../../components/Form/Input'
import { Milestone } from '../../../../goals.types'
import { Dispatch } from '../../../../../../typings'

export const NameCell: FunctionComponent<{
    milestone: Milestone
    isActiveMilestone: boolean
    name: string | undefined
    setName: Dispatch<string | undefined>
}> = ({ milestone, isActiveMilestone, name, setName }) => {
    return (
        <Td>
            {isActiveMilestone ? (
                <Input
                    value={name ?? milestone.name}
                    type='text'
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    {...inputStyles}
                />
            ) : (
                <Text>{milestone.name}</Text>
            )}
        </Td>
    )
}
