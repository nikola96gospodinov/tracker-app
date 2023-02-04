import useGetDocs from '../../hooks/useGetDoc'
import { GOALS } from '../../pages/goals/constants'
import { Goal } from '../../pages/goals/types'
import NoGoals from '../NoGoals'
import Spinner from '../spinner'

interface Props {
    userID: string
}

const WeeklyReview = ({ userID }: Props) => {
    const { docs: goals } = useGetDocs<Goal>({ userID, path: GOALS })

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
