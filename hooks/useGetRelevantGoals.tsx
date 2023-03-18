import { useEffect, useState } from 'react'
import { GOALS } from '../features/Goals/constants'
import { Goal } from '../features/Goals/goals.types'
import useGetDocs from './useGetDocs'
import useUserLogged from './useUserLogged'

export const useGetRelevantGoals = (habitID: string) => {
    const { user } = useUserLogged()
    const [isGoals, setIsGoals] = useState<boolean>()
    const { docs: goals, loading } = useGetDocs<Goal>({
        userID: user?.uid ?? '',
        path: GOALS
    })

    useEffect(() => {
        if (!loading) {
            if (!goals || goals.length === 0) {
                setIsGoals(false)
            } else {
                setIsGoals(true)
            }
        }
    }, [loading])

    const relevantGoals = goals?.filter(({ habits }) =>
        habits?.includes(habitID)
    )

    return {
        isGoals,
        relevantGoals,
        loading
    }
}
