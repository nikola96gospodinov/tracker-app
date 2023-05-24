import { FunctionComponent } from 'react'

import { ImmediateView } from './ImmediateView/ImmediateView'
import { UpcomingMilestones } from './UpcomingMilestones/UpcomingMilestones'

interface Tab {
    name: string
    Component: FunctionComponent<{
        type?: 'daily' | 'weekly'
        onOpen: () => void
    }>
    props: {
        type?: 'daily' | 'weekly'
    }
}

export const tabs: Tab[] = [
    {
        name: 'Today',
        Component: ImmediateView,
        props: {
            type: 'daily'
        }
    },
    {
        name: 'This Week',
        Component: ImmediateView,
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
