import { NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import IndividualGoalContent from '../../features/Goals/IndividualGoalPage/IndividualGoalContent'
import { GOALS } from '../../features/Goals/constants'
import { PageWrapper } from '../../components/Layout/PageWrapper'
import { UserContext } from '../../context/userContext'
import { Goal } from '../../features/Goals/goals.types'
import useGetDoc from '../../hooks/useGetDoc'

const IndividualGoal: NextPage = () => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const { doc: goal } = useGetDoc<Goal>({
        userID: userId,
        path: GOALS,
        url: router.query.goalUrl as string
    })

    return (
        <PageWrapper
            title={goal?.name ?? 'Goal'}
            description={goal?.description ?? 'Goal'}
        >
            <IndividualGoalContent />
        </PageWrapper>
    )
}

export default IndividualGoal
