import React from 'react'
import { isEmpty } from 'lodash'

import EmptyContent from '../EmptyContent'
import { TabElementProps } from '../../goals.types'
import DailyHabitsContent from './content'

const DailyHabits: React.FunctionComponent<TabElementProps> = ({
    shortName,
    newElementAdded,
    goal
}) => {
    const showEmptyContent = !newElementAdded && isEmpty(goal?.dailyHabits)
    const showDailyHabitsContent =
        !isEmpty(goal?.dailyHabits) || newElementAdded

    return (
        <>
            {showEmptyContent && <EmptyContent shortName={shortName} />}
            {showDailyHabitsContent && (
                <DailyHabitsContent
                    goal={goal}
                    newElementAdded={newElementAdded}
                    shortName={shortName}
                />
            )}
        </>
    )
}

export default DailyHabits
