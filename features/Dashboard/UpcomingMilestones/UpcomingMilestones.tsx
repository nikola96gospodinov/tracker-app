import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import { ErrorFetchingDocs } from '../../../components/Docs/ErrorFetchingDocs'
import NoDocsYet from '../../../components/Docs/NoDocsYet'
import { MILESTONES } from '../../../constants/goalsConstants'
import { Spinner } from '../../../components/UIElements/Spinner'
import { MilestoneBox } from '../MilestoneBox/MilestoneBox'
import { useGetRelentlessMilestones } from './hooks/useGetRelevantMilestones'
import { ActivePeriod } from '../data'

export const UpcomingMilestones: FunctionComponent<{
    activePeriod?: ActivePeriod
    includeWithNoDeadline?: boolean
}> = ({ activePeriod, includeWithNoDeadline }) => {
    const router = useRouter()

    const {
        relevantMilestones: milestones,
        loading,
        errorFetching
    } = useGetRelentlessMilestones({
        activePeriod,
        includeWithNoDeadline
    })

    if (loading) return <Spinner mt={8} text='Loading...' />

    if (errorFetching)
        return <ErrorFetchingDocs docType={MILESTONES} size='sm' />

    if (!milestones || milestones.length === 0)
        return (
            <NoDocsYet
                docType={MILESTONES}
                onClick={() => router.push('/goals')}
                size='sm'
                customMessage={`You don't have upcoming milestones. 🤔 You need to add milestones to your goals for them to appear here `}
            />
        )

    return (
        <SimpleGrid columns={3} gap={4} w='100%' pt={8}>
            {milestones.map((milestone) => (
                <MilestoneBox key={milestone.id} milestone={milestone} />
            ))}
        </SimpleGrid>
    )
}
