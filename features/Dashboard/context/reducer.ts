import { defaultValue } from './context'

export type ActionType =
    | {
          type: 'SET_TODAY' | 'SET_THIS_WEEK'
          payload: {
              activeDocsNumber: number
              inactiveDocsNumber: number
          }
      }
    | {
          type: 'SET_WHITHIN_ACTIVE_PERIOD'
          payload: number
      }

export const reducer = (state: typeof defaultValue, action: ActionType) => {
    switch (action.type) {
        case 'SET_TODAY':
            const {
                activeDocsNumber: activeDocsNumberToday,
                inactiveDocsNumber: inactiveDocsNumberToday
            } = action.payload

            return {
                ...state,
                today: activeDocsNumberToday,
                todayCompleted:
                    inactiveDocsNumberToday > 0 && activeDocsNumberToday === 0
            }
        case 'SET_THIS_WEEK':
            const {
                activeDocsNumber: activeDocsNumberThisWeek,
                inactiveDocsNumber: inactiveDocsNumberThisWeek
            } = action.payload

            return {
                ...state,
                thisWeek: activeDocsNumberThisWeek,
                thisWeekCompleted:
                    inactiveDocsNumberThisWeek > 0 &&
                    activeDocsNumberThisWeek === 0
            }
        case 'SET_WHITHIN_ACTIVE_PERIOD':
            return {
                ...state,
                whithinActivePeriod: action.payload
            }
        default:
            return state
    }
}
