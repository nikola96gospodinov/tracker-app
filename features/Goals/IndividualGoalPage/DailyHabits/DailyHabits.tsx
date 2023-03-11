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
    return (
        <>
            {!newElementAdded && <EmptyContent shortName={shortName} />}
            {newElementAdded && <DailyHabitsContent goal={goal} />}
        </>
    )
}

export default DailyHabits
