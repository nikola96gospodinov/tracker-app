import React, { useContext } from 'react'
import { useRouter } from 'next/router'

import { TabElementProps } from '../../../goals.types'
import { ErrorFetchingDocs } from '../../../../../components/Docs/ErrorFetchingDocs'
import { UserContext } from '../../../../../context/userContext'
import useGetFilteredDocs from '../../../../../hooks/useGetFilteredDocs'
import { HABITS } from '../../../../habits/constants'
import { Habit } from '../../../../habits/habits.types'
import { Spinner } from '../../../../../components/UIElements/Spinner'
import NoDocsYet from '../../../../../components/Docs/NoDocsYet'
import AttachedHabitsContent from './AttachedHabitsContent'

const AttachedHabits: React.FunctionComponent<TabElementProps> = ({
    shortName,
    goal,
    type
}) => {
    const router = useRouter()
    const { userId } = useContext(UserContext)
    const {
        docs: habits,
        loading,
        errorFetching
    } = useGetFilteredDocs<Habit>({
        userID: userId,
        path: HABITS,
        fieldPath: 'type',
        opStr: '==',
        value: type
    })

    const noHabits = habits?.length === 0 || !habits

    if (loading) return <Spinner mt={8} />

    if (errorFetching) return <ErrorFetchingDocs docType={HABITS} />

    if (noHabits)
        return (
            <NoDocsYet
                docType={shortName}
                onClick={() => router.push('/habits')}
            />
        )

    return (
        <AttachedHabitsContent goal={goal} shortName={shortName} type={type!} />
    )
}

export default AttachedHabits
