import { Td, Flex } from '@chakra-ui/react'

import CloseIcon from '../../../../../../components/Icons/CloseIcon'
import DeleteIcon from '../../../../../../components/Icons/DeleteIcon'
import EditIcon from '../../../../../../components/Icons/EditIcon'
import SaveIcon from '../../../../../../components/Icons/SaveIcon'
import { iconStyles, iconHoverStyles } from '../data'
import { Milestone } from '../../../../goals.types'

export const ActionsCell: React.FunctionComponent<{
    milestone: Milestone
    isActiveMilestone: boolean
    handleDeleteWarning: (milestone: Milestone) => void
    handleEditClick: (milestone: Milestone) => void
    handleCancelClick: () => void
    handleEdit: (
        name: string,
        deadline: string | undefined,
        target: number | undefined,
        progress: number | undefined
    ) => void
    name: string | undefined
    deadline: string | undefined
    target: number | undefined
    progress: number | undefined
}> = ({
    milestone,
    isActiveMilestone,
    handleDeleteWarning,
    handleEditClick,
    handleCancelClick,
    handleEdit,
    name,
    deadline,
    target,
    progress
}) => {
    return (
        <Td>
            <Flex justifyContent='flex-end' alignItems='center'>
                {isActiveMilestone ? (
                    <>
                        <SaveIcon
                            onClick={() =>
                                handleEdit(
                                    name ?? milestone.name,
                                    deadline ?? milestone.deadline,
                                    target ?? milestone.target,
                                    progress ?? milestone.progress
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
                            onClick={() => handleEditClick(milestone)}
                            {...iconStyles}
                            mr={2}
                            _hover={{
                                ...iconHoverStyles,
                                color: 'yellow.700'
                            }}
                        />
                        <DeleteIcon
                            onClick={() => handleDeleteWarning(milestone)}
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
    )
}
