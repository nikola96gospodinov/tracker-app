import useGetDocs from '../../hooks/useGetDocs'
import { GOALS } from '../goals/constants'
import { Goal } from '../goals/goals.types'
import NoGoals from '../../components/NoGoals'
import { Spinner } from '../../components/UIElements/Spinner'
import { ErrorFetchingDocs } from '../../components/Docs/ErrorFetchingDocs'

const WeeklyReview = () => {
    const {
        docs: goals,
        loading,
        errorFetching
    } = useGetDocs<Goal>({
        path: GOALS
    })

    if (!goals || loading) return <Spinner text='Loading...' />

    if (errorFetching) return <ErrorFetchingDocs docType={GOALS} />

    if (goals.length === 0) return <NoGoals />

    return <>Here are your goals {goals.length}</>
}

export default WeeklyReview
