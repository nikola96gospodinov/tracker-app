import useGetDocs from '../../hooks/useGetDocs'
import { GOALS } from '../Goals/constants'
import { Goal } from '../Goals/goals.types'
import NoGoals from '../../components/NoGoals'
import Spinner from '../../components/UIElements/spinner'
import useUserLogged from '../../hooks/useUserLogged'

const WeeklyReview = () => {
    const { user } = useUserLogged()
    const userID = user?.uid
    const {
        docs: goals,
        loading,
        errorFetching
    } = useGetDocs<Goal>({
        userID: userID ?? '',
        path: GOALS
    })

    if (!goals || loading) {
        return (
            <div className='initial-section'>
                <div className='container'>
                    <div className='initial-section-inner'>
                        <Spinner />
                    </div>
                </div>
            </div>
        )
    }

    if (errorFetching) {
        // TODO: Add an Error component
    }

    return (
        <div className='initial-section'>
            <div className='container'>
                <div className='initial-section-inner'>
                    {goals.length === 0 ? (
                        <NoGoals />
                    ) : (
                        <>Here are your goals {goals.length}</>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WeeklyReview
