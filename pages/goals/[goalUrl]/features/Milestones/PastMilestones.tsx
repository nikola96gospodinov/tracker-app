import { useState, useMemo } from 'react'
import { Td, Tr, Checkbox, Text, Flex } from '@chakra-ui/react'

import { Milestone } from '../../../goals.types'
import { formatDateForUI } from '../../../../../helpers/date-manipulation-functions'
import EditIcon from '../../../../../components/Icons/EditIcon'
import DeleteIcon from '../../../../../components/Icons/DeleteIcon'
import SaveIcon from '../../../../../components/Icons/SaveIcon'
import CloseIcon from '../../../../../components/Icons/CloseIcon'
import { Input } from '../../../../../components/Form/Input'
import {
    inputStyles,
    iconStyles,
    iconHoverStyles,
    trStyles
} from './data'

export const PastMilestones: React.FunctionComponent<{
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

    const pastMilestones = useMemo(
        () => relevantMilestones?.filter((milestone) => milestone.completed),
        [relevantMilestones]
    )

    return (
        <>
            {pastMilestones?.map((milestone) => {
                const isActiveMilestone = milestone.id == activeMilestone?.id
                const formattedDeadline =
                    milestone.deadline === ''
                        ? 'N/A'
                        : formatDateForUI(milestone.deadline)

                return (
                    <Tr
                        key={milestone.id}
                        {...trStyles}
                        bg={isActiveMilestone ? 'white' : 'none'}
                        opacity={isActiveMilestone ? 1 : 0.5}
                    >
                        <Td>
                            <Flex alignContent='center' justifyContent='center'>
                                <Checkbox
                                    onChange={() => handleToggle(milestone)}
                                    isChecked={milestone.completed}
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
                                <Text>{formattedDeadline}</Text>
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
