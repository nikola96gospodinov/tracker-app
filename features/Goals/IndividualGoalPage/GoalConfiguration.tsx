import React, { useState } from 'react'

import { Goal } from '../../../pages/goals/types'
import DailyHabits from './DailyHabits/DailyHabits'
import Milestones from './Milestones/Milestones'
import WeeklyTargets from './WeeklyTargets'

import styles from '../goal.module.scss'

const DAILY_HABITS_CAPITALIZED = 'Daily Habis'
const WEEKLY_TARGETS_CAPITALIZED = 'Weekly Targets'
export const MILESTONES_CAPITALIZED = 'Milestones'

const tabs = [
    {
        name: DAILY_HABITS_CAPITALIZED,
        shortName: 'habits',
        Component: DailyHabits
    },
    {
        name: WEEKLY_TARGETS_CAPITALIZED,
        shortName: 'targets',
        Component: WeeklyTargets
    },
    {
        name: MILESTONES_CAPITALIZED,
        shortName: 'milestones',
        Component: Milestones
    }
]

const GoalConfiguration: React.FunctionComponent<{
    goal: Goal
}> = ({ goal }) => {
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
                        className={`button button-primary ${styles.addButton}`}
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