import React from 'react'

import EmptyContent from './EmptyContent'
import { TabElementProps } from './interfaces'

const DailyHabits = ({ goalID, shortName }: TabElementProps) => {
  return (
    <div>
      <EmptyContent shortName={shortName} />
    </div>
  )
}

export default DailyHabits
