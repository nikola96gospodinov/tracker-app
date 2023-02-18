import React from 'react'

import styles from '../goal.module.scss'

const EmptyContent: React.FunctionComponent<{
    shortName: string
}> = ({ shortName }) => (
    <div className={styles.noData}>
        <p>
            No {shortName}... You can add some by pressing &apos;<b>Add</b>
            &apos;!
        </p>
    </div>
)

export default EmptyContent
