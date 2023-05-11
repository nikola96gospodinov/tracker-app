import { useState, useMemo } from 'react'
import { Td, Tr, Checkbox, Flex, Text, Tooltip } from '@chakra-ui/react'
import moment from 'moment'

import { Milestone } from '../../goals.types'
import { formatDateForUI } from '../../../../helpers/date-manipulation-functions'
import EditIcon from '../../../../components/Icons/EditIcon'
import DeleteIcon from '../../../../components/Icons/DeleteIcon'
import SaveIcon from '../../../../components/Icons/SaveIcon'
import CloseIcon from '../../../../components/Icons/CloseIcon'
import { trStyles, inputStyles, iconStyles, iconHoverStyles } from './data'
import DangerIcon from '../../../../components/Icons/DangerIcon'
import { Input } from '../../../../components/Form/Input'

export const UpcomingMilestones: React.FunctionComponent<{
    relevantMilestones: Milestone[]
    handleToggle: (milestone: Milestone) => void
    handleDeleteWarning: (milestone: Milestone) => void
    handleEditClick: (milestone: Milestone) => void
    handleCancelClick: () => void
    handleEdit: (name: string, deadline: string | undefined) => void
    activeMilestone: Milestone | undefined
}> = ({
    relevantMilestones,
    handleToggle,
    handleDeleteWarning,
    handleEditClick,
    handleCancelClick,
    handleEdit,
    activeMilestone
}) => {
    const [name, setName] = useState(activeMilestone?.name)
    const [deadline, setDeadline] = useState(activeMilestone?.deadline)

    const upcomingMilestones = useMemo(() => {
        const upcomingMilestonesWithDeadlines =
            relevantMilestones
                ?.filter(
                    (milestone) => !milestone.completed && milestone.deadline
                )
                .sort((a, b) => a.deadline!.localeCompare(b.deadline!)) ?? []
        const upcomingMilestonesWithoutDeadlines =
            relevantMilestones?.filter(
                (milestone) => !milestone.completed && !milestone.deadline
            ) ?? []
        return upcomingMilestonesWithDeadlines.concat(
            upcomingMilestonesWithoutDeadlines
        )
    }, [relevantMilestones])

    return (
        <>
            {upcomingMilestones?.map((milestone) => {
                const isActiveMilestone = milestone.id == activeMilestone?.id
                const formattedDeadline =
                    milestone.deadline === ''
                        ? 'N/A'
                        : formatDateForUI(milestone.deadline)
                const isPastDeadline = moment(milestone.deadline).isBefore(
                    moment()
                )

                return (
                    <Tr
                        key={milestone.id}
                        {...trStyles}
                        bg={isActiveMilestone ? 'white' : 'none'}
                    >
                        <Td>
                            <Flex alignContent='center' justifyContent='center'>
                                <Checkbox
                                    onChange={() => handleToggle(milestone)}
                                    checked
                                />
                            </Flex>
                        </Td>
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
                                                <DangerIcon
                                                    ml={1}
                                                    color='red.600'
                                                />
                                            </Text>
                                        </Tooltip>
                                    )}
                                </Text>
                            )}
                        </Td>
                        <Td>
                            <Flex justifyContent='flex-end' alignItems='center'>
                                {isActiveMilestone ? (
                                    <>
                                        <SaveIcon
                                            onClick={() =>
                                                handleEdit(
                                                    name ?? milestone.name,
                                                    deadline ??
                                                        milestone.deadline
                                                )
                                            }
                                            {...iconStyles}
                                            mr={2}
                                            _hover={{
                                                ...iconHoverStyles,
                                                color: 'green.500'
                                            }}
                                        />
                                        <CloseIcon
                                            onClick={handleCancelClick}
                                            {...iconStyles}
                                            _hover={{
                                                ...iconHoverStyles,
                                                color: 'red.500'
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <EditIcon
                                            onClick={() =>
                                                handleEditClick(milestone)
                                            }
                                            {...iconStyles}
                                            mr={2}
                                            _hover={{
                                                ...iconHoverStyles,
                                                color: 'yellow.700'
                                            }}
                                        />
                                        <DeleteIcon
                                            onClick={() =>
                                                handleDeleteWarning(milestone)
                                            }
                                            {...iconStyles}
                                            _hover={{
                                                ...iconHoverStyles,
                                                color: 'red.500'
                                            }}
                                        />
                                    </>
                                )}
                            </Flex>
                        </Td>
                    </Tr>
                )
            })}
        </>
    )
}
