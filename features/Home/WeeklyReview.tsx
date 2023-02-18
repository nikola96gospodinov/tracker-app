import useGetDocs from '../../hooks/useGetDoc'
import { GOALS } from '../Goals/constants'
import { Goal } from '../Goals/types'
import NoGoals from '../../components/NoGoals'
import Spinner from '../../components/UIElements/spinner'
import useUserLogged from '../../hooks/useUserLogged'

const WeeklyReview = () => {
    const { user } = useUserLogged()
    const userID = user?.uid
    const { docs: goals } = useGetDocs<Goal>({
        userID: userID ?? '',
        path: GOALS
    })

    if (!goals) {
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
