import React, { useState } from 'react'

import { Goal } from '../goals.types'
import { tabs } from '../data'

import styles from '../goal.module.scss'
import { Button } from '../../../components/UIElements/Button'

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
                    <Button
                        text='Add +'
                        btnClass='button-primary'
                        type='button'
                        onClick={() => setNewElementAdded(true)}
                        className={styles.addButton}
                    />
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
