import React from 'react'

import EmptyContent from '../EmptyContent'
import { TabElementProps } from '../../goals.types'
import DailyHabitsContent from './content'
import { isEmpty } from 'lodash'

const DailyHabits: React.FunctionComponent<TabElementProps> = ({
    goalID,
    shortName,
    newElementAdded,
    setNewElementAdded,
    activeTab,
    goal
}) => {
    const showEmptyContent = !newElementAdded && isEmpty(goal?.habits)
    const showDailyHabitsContent = !isEmpty(goal?.habits) || newElementAdded

    return (
        <>
            {showEmptyContent && <EmptyContent shortName={shortName} />}
            {showDailyHabitsContent && (
                <DailyHabitsContent
                    goal={goal}
                    newElementAdded={newElementAdded}
                />
            )}
        </>
    )
}

export default DailyHabits
