import React, { useState } from 'react'

import { Goal } from '../goals.types'
import DailyHabits from './DailyHabits/DailyHabits'
import Milestones from './Milestones/Milestones'
import WeeklyTargets from './WeeklyTargets/WeeklyTargets'

import styles from '../goal.module.scss'
import {
    DAILY_HABITS_CAPITALIZED,
    WEEKLY_TARGETS_CAPITALIZED,
    MILESTONES_CAPITALIZED,
    TARGETS,
    MILESTONES
} from '../constants'
import { HABITS } from '../../Habits/constants'

const tabs = [
    {
        name: DAILY_HABITS_CAPITALIZED,
        shortName: HABITS,
        Component: DailyHabits
    },
    {
        name: WEEKLY_TARGETS_CAPITALIZED,
        shortName: TARGETS,
        Component: WeeklyTargets
    },
    {
        name: MILESTONES_CAPITALIZED,
        shortName: MILESTONES,
        Component: Milestones
    }
]

const GoalConfiguration: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].name)
    const [newElementAdded, setNewElementAdded] = useState(false)
    const addButtonClasses = `button button-primary ${styles.addButton}`

    return (
        <div className={styles.goalConfiguration}>
            <div className={styles.controls}>
                <div className={styles.tabs}>
                    {tabs.map((tab, key) => (
                        <div
                            key={key}
                            onClick={() => {
                                setActiveTab(tab.name)
                                if (tab.name !== activeTab)
                                    setNewElementAdded(false)
                            }}
                            className={
                                activeTab === tab.name
                                    ? styles.active
                                    : undefined
                            }
                        >
                            {tab.name}
                        </div>
                    ))}
                </div>
                <div>
                    <button
                        className={addButtonClasses}
                        onClick={() => setNewElementAdded(true)}
                    >
                        Add +
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                {tabs.map(({ Component, shortName, name }, key) => {
                    if (activeTab === name) {
                        return (
                            <Component
                                key={key}
                                shortName={shortName}
                                goalID={goal.id}
                                newElementAdded={newElementAdded}
                                setNewElementAdded={setNewElementAdded}
                                activeTab={activeTab}
                                goal={goal}
                            />
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        </div>
    )
}

export default GoalConfiguration
