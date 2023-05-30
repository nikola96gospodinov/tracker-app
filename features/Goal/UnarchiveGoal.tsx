import { Flex, Text, useToast } from '@chakra-ui/react'
import { FunctionComponent, useContext, useState } from 'react'

import ArchiveIcon from '../../components/Icons/ArchiveIcon'
import { GOALS } from '../../constants/goalsConstants'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { Goal } from '../../types/goals.types'
import { UserContext } from '../../context/userContext'

export const UnarchveGoal: FunctionComponent<{
    goalId: string
}> = ({ goalId }) => {
    const toast = useToast()
    const { userId } = useContext(UserContext)
    const [isHovering, setIsHovering] = useState(false)
    const text = isHovering ? 'Unarchive' : 'Archived'

    const unarchiveGoal = () => {
        submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goalId,
                status: 'active'
            } as Goal,
            userID: userId,
            toast,
            toastSuccessMessage: 'Goal staus updated successfully',
            toastErrorMessage:
                'There was an error updating the goal status. Please try again'
        })
    }

    return (
        <Flex
            align='center'
            gap={2}
            cursor='pointer'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={unarchiveGoal}
        >
            <ArchiveIcon
                fill={isHovering ? 'purple.700' : 'blue.400'}
                transition='.2s ease'
            />
            <Text
                _hover={{
                    color: isHovering ? 'purple.700' : 'neutral.900'
                }}
            >
                {text}
            </Text>
        </Flex>
    )
}
