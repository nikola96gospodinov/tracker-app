import React from 'react'
import { isEmpty } from 'lodash'

import EmptyContent from '../EmptyContent'
import { TabElementProps } from '../../goals.types'
import WeeklyHabitsContent from './content'

const WeeklyHabits: React.FunctionComponent<TabElementProps> = ({
    shortName,
    newElementAdded,
    goal
}) => {
    const showEmptyContent = !newElementAdded && isEmpty(goal?.targets)
    const showWeeklyTargetsContent = !isEmpty(goal?.targets) || newElementAdded

    return (
        <>
            {showEmptyContent && <EmptyContent shortName={shortName} />}
            {showWeeklyTargetsContent && (
                <WeeklyHabitsContent
                    goal={goal}
                    newElementAdded={newElementAdded}
                    shortName={shortName}
                />
            )}
        </>
    )
}

export default WeeklyHabits
