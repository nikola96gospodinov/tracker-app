import { Flex, Tooltip, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import moment from 'moment'

import CalendarIcon from '../components/Icons/CalendarIcon'
import DangerIcon from '../components/Icons/DangerIcon'
import { formatDateForUI } from '../helpers/date-manipulation-functions'

export const Deadline: FunctionComponent<{
    deadline: string | undefined
    isCompleted?: boolean
}> = ({ deadline, isCompleted }) => {
    const formattedDeadline =
        deadline || deadline !== '' ? formatDateForUI(deadline) : 'N/A'
    const isPastDeadline = moment(deadline).isBefore(moment()) && !isCompleted

    return (
        <Flex align='center' gap={2.5}>
            <CalendarIcon /> <Text>{formattedDeadline}</Text>{' '}
            {isPastDeadline && (
                <Tooltip label='Past the deadline'>
                    <Text as='span'>
                        <DangerIcon color='red.600' />
                    </Text>
                </Tooltip>
            )}
        </Flex>
    )
}
