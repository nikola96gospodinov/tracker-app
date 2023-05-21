import { NextPage } from 'next/types'
import { useRouter } from 'next/router'

import IndividualGoalContent from '../../../features/Goal/IndividualGoalContent'
import { GOALS } from '../../../constants/goalsConstants'
import { PageWrapper } from '../../../components/Layout/PageWrapper'
import { Goal } from '../../../types/goals.types'
import useGetDoc from '../../../hooks/useGetDoc'
import InitialSection from '../../../components/InitialSection'

const IndividualGoal: NextPage = () => {
    const router = useRouter()
    const { doc: goal } = useGetDoc<Goal>({
        path: GOALS,
        property: 'urlPath',
        value: router.query.goalUrl as string
    })

    return (
        <PageWrapper
            title={goal?.name ?? 'Goal'}
            description={goal?.description ?? 'Goal'}
        >
            <InitialSection>
                <IndividualGoalContent />
            </InitialSection>
        </PageWrapper>
    )
}

export default IndividualGoal
