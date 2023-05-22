import { FunctionComponent, useContext } from 'react'
import { Button, Tooltip, Text, Flex } from '@chakra-ui/react'

import QuestionMarkIcon from '../../components/Icons/QuestionMark'
import { GOALS } from '../../constants/goalsConstants'
import { submitDoc } from '../../helpers/crud-operations/crud-operations-main-docs'
import { Goal } from '../../types/goals.types'
import { UserContext } from '../../context/userContext'

export const ArchiveGoal: FunctionComponent<{
    onClose: () => void
    goalId: string
}> = ({ onClose, goalId }) => {
    const { userId } = useContext(UserContext)

    const archiveGoal = () => {
        submitDoc<Goal>({
            path: GOALS,
            orgDoc: {
                id: goalId,
                status: 'archived'
            } as Goal,
            userID: userId
        })
        onClose()
    }

    return (
        <Flex justify='center' mt={8} gap={1}>
            <Button variant='link' onClick={archiveGoal}>
                Archive instead?
            </Button>
            <Tooltip label='This will hide the goal from your dashboard. This is for goals that you no longer want to pursue but would like to keep the history of.'>
                <Text as='span'>
                    <QuestionMarkIcon
                        fill='purple.700'
                        cursor='pointer'
                        mt={0.5}
                        display='block'
                    />
                </Text>
            </Tooltip>
        </Flex>
    )
}
