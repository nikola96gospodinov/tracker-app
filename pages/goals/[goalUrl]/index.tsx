import { NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import IndividualGoalContent from './features/IndividualGoalContent'
import { GOALS } from '../constants'
import { PageWrapper } from '../../../components/Layout/PageWrapper'
import { UserContext } from '../../../context/userContext'
import { Goal } from '../goals.types'
import useGetDoc from '../../../hooks/useGetDoc'
import InitialSection from '../../../components/InitialSection'

const IndividualGoal: NextPage = () => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const { doc: goal } = useGetDoc<Goal>({
        userID: userId,
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
