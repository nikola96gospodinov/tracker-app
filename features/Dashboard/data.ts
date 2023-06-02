import { FunctionComponent } from 'react'

import { ImmediateView } from './ImmediateView/ImmediateView'
import { UpcomingMilestones } from './Upcomming/Upcomming'
import { HabitType } from '../../types/habits.types'

export const periods = [
    {
        label: 'Whithin a Month',
        value: 'oneMonth'
    },
    {
        label: 'Whithin Three Months',
        value: 'threeMonths'
    },
    {
        label: 'Whithin Six Months',
        value: 'sixMonths'
    },
    {
        label: 'Whithin a Year',
        value: 'oneYear'
    }
] as const

export type ActivePeriod = (typeof periods)[number]['label']

interface Tab {
    name: string
    Component: FunctionComponent<{
        includeWithNoDeadline?: boolean
        activePeriod?: ActivePeriod
        type?: HabitType
        onOpen: () => void
    }>
    props: {
        type?: HabitType
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
        name: periods[0].label,
        Component: UpcomingMilestones,
        props: {}
    }
]
