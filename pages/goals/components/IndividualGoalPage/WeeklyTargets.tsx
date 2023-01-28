import React from 'react'

import EmptyContent from './EmptyContent'
import { TabElementProps } from './interfaces'

const WeeklyTargets = ({ goalID, shortName }: TabElementProps) => {
  return (
    <div>
      <EmptyContent shortName={shortName} />
    </div>
  )
}

export default WeeklyTargets
