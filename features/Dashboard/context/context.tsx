import {
    Dispatch,
    FunctionComponent,
    PropsWithChildren,
    createContext,
    useReducer
} from 'react'
import { ActionType, reducer } from './reducer'

interface TabsNumbersContextType {
    today: number
    todayCompleted: boolean
    thisWeek: number
    thisWeekCompleted: boolean
    withinActivePeriod: number
}

export const defaultValue = {
    today: 0,
    todayCompleted: false,
    thisWeek: 0,
    thisWeekCompleted: false,
    withinActivePeriod: 0
}

export const TabsNumbersContext =
    createContext<TabsNumbersContextType>(defaultValue)

export const TabsNumbersDispatchContext =
    createContext<Dispatch<ActionType> | null>(null)

export const TabsNumbersProvider: FunctionComponent<PropsWithChildren> = ({
    children
}) => {
    const [state, dispatch] = useReducer(reducer, defaultValue)

    return (
        <TabsNumbersContext.Provider value={state}>
            <TabsNumbersDispatchContext.Provider value={dispatch}>
                {children}
            </TabsNumbersDispatchContext.Provider>
        </TabsNumbersContext.Provider>
    )
}
