import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiTwotoneEdit, AiTwotoneCalendar } from 'react-icons/ai'

import { Goal } from '../goals.types'
import { goalsIcons } from '../data'
import { capitalizeFirstLetter } from '../../../helpers/string-manipulation-functions'
import { formatDateForUI } from '../../../helpers/date-manipulation-functions'

import styles from '../goal.module.scss'

export const GoalBox: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const [showEditIcon, setShowEditIcon] = useState(false)

    const icon = goalsIcons[goal.category as keyof typeof goalsIcons]
    const deadline = goal.deadline ? formatDateForUI(goal.deadline) : 'N/A'
    const category = capitalizeFirstLetter(goal.category)

    return (
        <Link href={`/goals/${goal.urlPath}`}>
            <a
                className={styles.goalHolder}
                onMouseEnter={() => setShowEditIcon(true)}
                onMouseLeave={() => setShowEditIcon(false)}
            >
                {showEditIcon && <AiTwotoneEdit className={styles.editIcon} />}
                <div className={styles.categoryPill}>
                    <div>
                        <Image src={icon.src} alt={icon.alt} />
                        <span>{category}</span>
                    </div>
                </div>
                <div className={styles.textHolder}>
                    <h3>{goal.name}</h3>
                    <p>{goal.description}</p>
                    <p className={styles.dueDate}>
                        <AiTwotoneCalendar />
                        {deadline}
                    </p>
                </div>
            </a>
        </Link>
    )
}
