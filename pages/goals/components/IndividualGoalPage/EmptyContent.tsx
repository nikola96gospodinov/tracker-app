import React from 'react'

import styles from '../goal.module.scss'

interface Props {
    shortName: string
}

const EmptyContent = ({ shortName }: Props) => {
  return (
    <div className={styles.noData}>
      No {shortName}... You can add some by pressing &apos;<b>New</b>&apos;!
    </div>
  )
}

export default EmptyContent
