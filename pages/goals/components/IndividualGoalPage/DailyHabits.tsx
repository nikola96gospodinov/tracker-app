import { useAuthUser } from '@react-query-firebase/auth'
import React from 'react'

import { auth } from '../../../../firebase/firebase'
import useGetDocs from '../../../../hooks/useGetDoc'
import { HABITS } from '../../../habits/constants'
import { Habit } from '../../../habits/types'
import EmptyContent from './EmptyContent'
import { TabElementProps } from './types'

const DailyHabits = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab
}: TabElementProps) => {
    const { data: user } = useAuthUser(['user'], auth)
    const { docs: allHabits, errorFetching } = useGetDocs<Habit>({
        userID: user?.uid ?? '',
        path: HABITS
    })

    if (errorFetching) {
        return (
            <p>We had problem getting your habits... Please refresh the page</p>
        )
    }

    return (
        <>
            {!newElementAdded && <EmptyContent shortName={shortName} />}
            {newElementAdded && <table>Adding a habit will be here</table>}
        </>
    )
}

export default DailyHabits
