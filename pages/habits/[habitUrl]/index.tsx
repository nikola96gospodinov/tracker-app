import { NextPage } from 'next'
import { useRouter } from 'next/router'

import IndividualHabitContent from '../../../features/Habit/IndividualHabitContent'
import { PageWrapper } from '../../../components/Layout/PageWrapper'
import { Habit } from '../../../types/habits.types'
import useGetDoc from '../../../hooks/useGetDoc'
import { HABITS } from '../../../constants/habitsConstants'
import InitialSection from '../../../components/InitialSection'

const IndividuaHait: NextPage = () => {
    const router = useRouter()
    const { doc: habit } = useGetDoc<Habit>({
        path: HABITS,
        property: 'urlPath',
        value: router.query.habitUrl as string
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
