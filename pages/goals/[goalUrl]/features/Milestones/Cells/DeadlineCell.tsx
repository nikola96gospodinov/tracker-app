import { Td, Text, Tooltip } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import moment from 'moment'

import { inputStyles } from '../data'
import { Input } from '../../../../../../components/Form/Input'
import { Milestone } from '../../../../goals.types'
import { formatDateForUI } from '../../../../../../helpers/date-manipulation-functions'
import { Dispatch } from '../../../../../../typings'
import DangerIcon from '../../../../../../components/Icons/DangerIcon'

export const DeadlineCell: FunctionComponent<{
    milestone: Milestone
    isActiveMilestone: boolean
    deadline: string | undefined
    setDeadline: Dispatch<string | undefined>
}> = ({ milestone, isActiveMilestone, deadline, setDeadline }) => {
    const formattedDeadline =
        milestone.deadline === '' ? 'N/A' : formatDateForUI(milestone.deadline)
    const isPastDeadline =
        moment(milestone.deadline).isBefore(moment()) && !milestone.completed

    return (
        <Td>
            {isActiveMilestone ? (
                <Input
                    value={deadline ?? milestone.deadline}
                    type='date'
                    onChange={(e) => {
                        setDeadline(e.target.value)
                    }}
                    {...inputStyles}
                />
            ) : (
                <Text>
                    {formattedDeadline}{' '}
                    {isPastDeadline && (
                        <Tooltip label='Past the deadline'>
                            <Text as='span'>
                                <DangerIcon ml={1} color='red.600' />
                            </Text>
                        </Tooltip>
                    )}
                </Text>
            )}
        </Td>
    )
}
