import React from 'react'
import Image from 'next/image'

import { formatDateForUI } from '../../../helpers/date-manipulation-functions'
import { capitalizeFirstLetter } from '../../../helpers/string-manipulation-functions'
import { goalsIcons } from '../data'
import { Goal } from '../goals.types'
import { Dispatch } from '../../../typings'

import styles from '../goal.module.scss'
import EditIcon from '../../../components/Icons/EditIcon'
import DeleteIcon from '../../../components/Icons/DeleteIcon'
import CalendarIcon from '../../../components/Icons/CalendarIcon'

const GoalInfo: React.FunctionComponent<{
    goal: Goal
    setEditForm: Dispatch<boolean>
    setDeleteWarning: Dispatch<boolean>
}> = ({ goal, setEditForm, setDeleteWarning }) => {
    const icon = goalsIcons[goal.category as keyof typeof goalsIcons]
    const deadline = goal.deadline ? formatDateForUI(goal.deadline) : 'N/A'

    return (
        <div className={styles.goalsPage}>
            <div className={styles.headerSection}>
                <div className={styles.categoryPill}>
                    <div>
                        <Image src={icon.src} alt={icon.alt} />
                        <span>{capitalizeFirstLetter(goal.category)}</span>
                    </div>
                    <div>
                        <CalendarIcon />
                        <span>{deadline}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EditIcon
                        className={styles.editIcon}
                        onClick={() => setEditForm(true)}
                    />
                    <DeleteIcon
                        className={styles.deleteIcon}
                        onClick={() => setDeleteWarning(true)}
                    />
                </div>
            </div>
            <h1>{goal.name}</h1>
            <p>{goal.description}</p>
        </div>
    )
}

export default GoalInfo
