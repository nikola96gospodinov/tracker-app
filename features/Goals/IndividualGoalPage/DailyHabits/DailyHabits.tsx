import React from 'react'

import useGetDocs from '../../../../hooks/useGetDocs'
import useUserLogged from '../../../../hooks/useUserLogged'
import { HABITS } from '../../../Habits/constants'
import { Habit } from '../../../Habits/habits.types'
import EmptyContent from '../EmptyContent'
import { TabElementProps } from '../../goals.types'
import DailyHabitsContent from './content'

const DailyHabits: React.FunctionComponent<TabElementProps> = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab,
    goal
}) => {
    const { user } = useUserLogged()
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
