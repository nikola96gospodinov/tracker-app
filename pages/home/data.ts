import { FunctionComponent } from 'react'

import { HabitView } from './HabitView/HabitView'
import { UpcomingMilestones } from './UpcomingMilestones'

interface Tab {
    name: string
    Component: FunctionComponent<{
        type?: 'daily' | 'weekly'
    }>
    props: {
        type?: 'daily' | 'weekly'
    }
}

export const tabs: Tab[] = [
    {
        name: 'Today',
        Component: HabitView,
        props: {
            type: 'daily'
        }
    },
    {
        name: 'This Week',
        Component: HabitView,
        props: {
            type: 'weekly'
        }
    },
    {
        name: 'Upcoming Milestones',
        Component: UpcomingMilestones,
        props: {}
    }
]
