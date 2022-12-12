import React, { useState } from 'react'

import { Goal } from '../../interfaces'
import DailyHabits from './DailyHabits'
import Milestones from './Milestones/Milestones'
import WeeklyTargets from './WeeklyTargets'

import styles from '../goal.module.scss'

const DAILY_HABITS = 'Daily Habis'
const WEEKLY_TARGETS = 'Weekly Targets'
const MILESTONES = 'Milestones'

const tabs = [
    {
        name: DAILY_HABITS,
        shortName: 'habits',
        Component: DailyHabits
    },
    {
        name: WEEKLY_TARGETS,
        shortName: 'targets',
        Component: WeeklyTargets
    },
    {
        name: MILESTONES,
        shortName: 'milestones',
        Component: Milestones
    }
]

interface Props {
    goal: Goal
}

const GoalConfiguration = ({ goal }: Props) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name)
    const [newElementAdded, setNewElementAdded] = useState(false)

    return (
        <div className={styles.goalConfiguration}>
            <div className={styles.controls}>
                <div className={styles.tabs}>
                    {tabs.map((tab, key) => (
                        <div
                            key={key}
                            onClick={() => {
                                setActiveTab(tab.name)
                                if (tab.name !== activeTab) setNewElementAdded(false)
                            }}
                            className={activeTab === tab.name ? styles.active : undefined}
                        >
                            {tab.name}
                        </div>
                    ))}
                </div>
                <div>
                    <button className={`button button-primary ${styles.addButton}`} onClick={() => setNewElementAdded(true)}>New +</button>
                </div>
            </div>

            <div className={styles.content}>
                {tabs.map(({ Component, shortName, name }, key) => {
                    if (activeTab === name) {
                        return <Component key={key} shortName={shortName} goalID={goal.id} newElementAdded={newElementAdded} setNewElementAdded={setNewElementAdded} />
                    } else {
                        return null
                    }
                })}
            </div>
        </div>
    )
}

export default GoalConfiguration
