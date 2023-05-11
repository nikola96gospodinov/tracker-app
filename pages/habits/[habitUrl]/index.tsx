import { NextPage } from 'next'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import IndividualHabitContent from './features/IndividualHabitContent'
import { PageWrapper } from '../../../components/Layout/PageWrapper'
import { UserContext } from '../../../context/userContext'
import { Habit } from '../habits.types'
import useGetDoc from '../../../hooks/useGetDoc'
import { HABITS } from '../constants'
import InitialSection from '../../../components/InitialSection'

const IndividuaHait: NextPage = () => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const { doc: habit } = useGetDoc<Habit>({
        userID: userId,
        path: HABITS,
        url: router.query.habitUrl as string
    })

    return (
        <PageWrapper
            title={habit?.name ?? 'Habit'}
            description={habit?.description ?? 'Habit'}
        >
            <InitialSection>
                <IndividualHabitContent />
            </InitialSection>
        </PageWrapper>
    )
}

export default IndividuaHait
