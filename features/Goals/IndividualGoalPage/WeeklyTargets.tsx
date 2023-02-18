import React from 'react'

import EmptyContent from './EmptyContent'
import { TabElementProps } from './types'

const WeeklyTargets: React.FunctionComponent<TabElementProps> = ({
    goalID,
    shortName
}) => {
    return (
        <div>
            <EmptyContent shortName={shortName} />
        </div>
    )
}

export default WeeklyTargets
