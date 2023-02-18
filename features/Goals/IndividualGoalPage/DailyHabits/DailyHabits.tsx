import { useAuthUser } from '@react-query-firebase/auth'
import React from 'react'

import { auth } from '../../../../firebase/firebase'
import useGetDocs from '../../../../hooks/useGetDoc'
import { HABITS } from '../../../../pages/habits/constants'
import { Habit } from '../../../../pages/habits/types'
import EmptyContent from '../EmptyContent'
import { TabElementProps } from '../types'
import DailyHabitsContent from './content'

const DailyHabits: React.FunctionComponent<TabElementProps> = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab,
    goal
}) => {
    const { data: user } = useAuthUser(['user'], auth)
    const { docs: allHabits, errorFetching } = useGetDocs<Habit>({
        userID: user?.uid ?? '',
        path: HABITS
    })

    if (errorFetching) {
        return (
            <p>
                We had a problem getting your habits... Please refresh the page
            </p>
        )
    }

    return (
        <>
            {!newElementAdded && <EmptyContent shortName={shortName} />}
            {newElementAdded && (
                <DailyHabitsContent goal={goal} allHabits={allHabits} />
            )}
        </>
    )
}

export default DailyHabits