import React from 'react'
import { isEmpty } from 'lodash'

import EmptyContent from '../EmptyContent'
import { TabElementProps } from '../../goals.types'
import WeeklyTargetsContent from './content'

const WeeklyTargets: React.FunctionComponent<TabElementProps> = ({
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
                <WeeklyTargetsContent
                    goal={goal}
                    newElementAdded={newElementAdded}
                    shortName={shortName}
                />
            )}
        </>
    )
}

export default WeeklyTargets
