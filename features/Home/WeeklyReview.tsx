import { useContext } from 'react'

import useGetDocs from '../../hooks/useGetDocs'
import { GOALS } from '../Goals/constants'
import { Goal } from '../Goals/goals.types'
import NoGoals from '../../components/NoGoals'
import { Spinner } from '../../components/UIElements/Spinner'
import { UserContext } from '../../context/userContext'
import { ErrorFetchingDocs } from '../../components/Docs/ErrorFetchingDocs'

const WeeklyReview = () => {
    const { userId } = useContext(UserContext)
    const {
        docs: goals,
        loading,
        errorFetching
    } = useGetDocs<Goal>({
        userID: userId,
        path: GOALS
    })

    if (!goals || loading) return <Spinner text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={GOALS} />

    if (goals.length === 0) return <NoGoals />

    return <>Here are your goals {goals.length}</>
}

export default WeeklyReview
