import { FunctionComponent } from 'react'
import { Box, Divider, Flex, Text, VStack } from '@chakra-ui/react'

import { useGetAllActiveHabitsByType } from '../../hooks/useGetAllActiveHabitsByType'
import { Spinner } from '../../../../components/UIElements/Spinner'
import { ErrorFetchingDocs } from '../../../../components/Docs/ErrorFetchingDocs'
import { HABITS } from '../../../habits/constants'
import { ActiveHabits } from './ActiveHabits'
import { InactiveHabits } from './InactiveHabits'
import NoDocsYet from '../../../../components/Docs/NoDocsYet'
import { useRouter } from 'next/router'

export const EditActiveHabits: FunctionComponent<{
    activeTab: string
}> = ({ activeTab }) => {
    const router = useRouter()
    const type = activeTab === 'Today' ? 'daily' : 'weekly'
    const { activeHabits, inactiveHabits, loading, errorFetching } =
        useGetAllActiveHabitsByType(type)

    if (loading) return <Spinner text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} size='sm' />

    if (activeHabits.length === 0 && inactiveHabits.length === 0)
        return (
            <NoDocsYet
                docType={HABITS}
                onClick={() => router.push('/habits')}
                size='sm'
            />
        )

    return (
        <VStack gap={6} align='flex-start'>
            <Box>
                <Text fontSize='lg' mb={2}>
                    Active Habits:
                </Text>
                <ActiveHabits habits={activeHabits} />
            </Box>
            <Box>
                <Text fontSize='lg' mb={2}>
                    Inactive Habits:
                </Text>
                <InactiveHabits habits={inactiveHabits} />
            </Box>
        </VStack>
    )
}
