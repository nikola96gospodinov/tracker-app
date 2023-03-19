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
    const showEmptyContent = !newElementAdded && isEmpty(goal?.habits)
    const showDailyHabitsContent = !isEmpty(goal?.habits) || newElementAdded

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
