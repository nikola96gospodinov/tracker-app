import React from 'react'

import EmptyContent from './EmptyContent'

interface Props {
    goalID: string
    shortName: string
    newElementAdded: boolean
    setNewElementAdded: React.Dispatch<React.SetStateAction<boolean>>
}

const DailyHabits = ({ goalID, shortName }: Props) => {
  return (
    <div>
      <EmptyContent shortName={shortName} />
    </div>
  )
}

export default DailyHabits
