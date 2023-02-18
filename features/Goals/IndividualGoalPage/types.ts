import { Goal } from '../types'
import { Dispatch } from '../../../typings'

export interface TabElementProps {
    goalID: string
    shortName: string
    newElementAdded: boolean
    setNewElementAdded: Dispatch<boolean>
    activeTab: string
    goal?: Goal
}
