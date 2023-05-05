import { NextPage } from 'next'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import IndividualHabitContent from '../../features/Habits/IndividualHabitPage/IndividualHabitContent'
import { PageWrapper } from '../../components/Layout/PageWrapper'
import { UserContext } from '../../context/userContext'
import { Habit } from '../../features/Habits/habits.types'
import useGetDoc from '../../hooks/useGetDoc'
import { HABITS } from '../../features/Habits/constants'

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
            <IndividualHabitContent />
        </PageWrapper>
    )
}

export default IndividuaHait
