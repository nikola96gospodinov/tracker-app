import { Skeleton, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { Link } from '../../../components/UIElements/Link'
import { Goal } from '../../goals/goals.types'
import useGetDoc from '../../../hooks/useGetDoc'
import { GOALS } from '../../goals/constants'

export const AttachedGoal: FunctionComponent<{
    goalId: string
}> = ({ goalId }) => {
    const {
        doc: goal,
        loading,
        errorFetching
    } = useGetDoc<Goal>({
        path: GOALS,
        property: 'id',
        value: goalId
    })

    if (errorFetching || !goal)
        return (
            <Text color='red.500' fontSize='sm'>
                🎯 Not Found
            </Text>
        )

    return (
        <Skeleton isLoaded={!loading}>
            <Link
                href={`/goals/${goal.urlPath}`}
                variant='link'
                color='neutral.900'
                fontSize='sm'
                _hover={{ textDecoration: 'none', color: 'purple.600' }}
            >
                {goal.name} 🎯
            </Link>
        </Skeleton>
    )
}
