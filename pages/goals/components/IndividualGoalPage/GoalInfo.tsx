import React from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { BsFillCalendar2CheckFill } from 'react-icons/bs'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import Image from 'next/image'

import { formatDateFromString } from '../../../../helpers/date-manipulation-functions'
import { capitalizeFirstLetter } from '../../../../helpers/string-manipulation-functions'
import { goalsIcons } from '../../constants'
import { Goal } from '../../interfaces'

import styles from '../goal.module.scss'

interface Props {
    goal: Goal
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteWarning: React.Dispatch<React.SetStateAction<boolean>>
}

const GoalInfo = ({ goal, setEditForm, setDeleteWarning }: Props) => {
    const icon = goalsIcons[goal.category as keyof typeof goalsIcons]

    return (
        <div className={styles.goalsPage}>
            <div className={styles.headerSection}>
                <div className={styles.categoryPill}>
                    <div>
                        <Image
                            src={icon.src}
                            alt={icon.alt}
                        />
                        <span>{capitalizeFirstLetter(goal.category)}</span>
                    </div>
                    <div>
                        <BsFillCalendar2CheckFill />
                        <span>{goal.deadline ? formatDateFromString(goal.deadline)  : 'N/A'}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AiTwotoneEdit
                        className={styles.editIcon}
                        onClick={() => setEditForm(true)}
                    />
                    <RiDeleteBin6Fill
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
