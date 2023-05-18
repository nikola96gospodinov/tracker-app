import { FunctionComponent } from 'react'

import {
    DAILY_HABITS_CAPITALIZED,
    DAILY_HABITS,
    WEEKLY_HABITS_CAPITALIZED,
    WEEKLY_HABITS,
    MILESTONES_CAPITALIZED,
    MILESTONES
} from '../constants'
import Milestones from './features/Milestones/Milestones'
import AttachedHabits from './features/AttachedHabits/AttachedHabits'
import { TabElementProps } from '../goals.types'

interface Tab {
    name: string
    shortName: string
    Component: FunctionComponent<TabElementProps>
    props: {
        type?: 'daily' | 'weekly'
    }
}

export const tabs: Tab[] = [
    {
        name: DAILY_HABITS_CAPITALIZED,
        shortName: DAILY_HABITS,
        Component: AttachedHabits,
        props: {
            type: 'daily'
        }
    },
    {
        name: WEEKLY_HABITS_CAPITALIZED,
        shortName: WEEKLY_HABITS,
        Component: AttachedHabits,
        props: {
            type: 'weekly'
        }
    },
    {
        name: MILESTONES_CAPITALIZED,
        shortName: MILESTONES,
        Component: Milestones,
        props: {}
    }
]
