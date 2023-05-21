import { FunctionComponent } from 'react'
import { Skeleton, Text, Tooltip } from '@chakra-ui/react'

import useGetFilteredDocs from '../../../../../hooks/useGetFilteredDocs'
import { MILESTONES } from '../../../constants'
import { Milestone } from '../../../goals.types'

export const MilestonesHit: FunctionComponent<{
    goalId: string
}> = ({ goalId }) => {
    const {
        docs: milestones,
        loading,
        errorFetching
    } = useGetFilteredDocs<Milestone>({
        path: MILESTONES,
        fieldPath: 'goalID',
        opStr: '==',
        value: goalId
    })

    if (errorFetching && !loading)
        return (
            <Tooltip label='Error fetching the milestones'>
                <Text color='red.500' fontSize='sm'>
                    🚩 Not Found
                </Text>
            </Tooltip>
        )

    if (milestones?.length === 0)
        return (
            <Tooltip label='No milestones'>
                <Text fontSize='sm' cursor='pointer'>
                    🚩 N/A
                </Text>
            </Tooltip>
        )

    const completedMilestonesLength = milestones?.filter(
        ({ completed }) => completed
    ).length

    return (
        <Skeleton isLoaded={!loading}>
            <Tooltip label='Completed milestones'>
                <Text
                    color='neutral.900'
                    fontSize='sm'
                    cursor='pointer'
                    _hover={{ textDecoration: 'none', color: 'purple.600' }}
                >
                    🚩 {completedMilestonesLength} / {milestones?.length}
                </Text>
            </Tooltip>
        </Skeleton>
    )
}
