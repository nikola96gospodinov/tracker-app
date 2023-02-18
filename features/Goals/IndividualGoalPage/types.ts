import { Goal } from '../../../pages/goals/types'

export interface TabElementProps {
    goalID: string
    shortName: string
    newElementAdded: boolean
    setNewElementAdded: React.Dispatch<React.SetStateAction<boolean>>
    activeTab: string
    goal?: Goal
}
