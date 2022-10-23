import useGetGoals from '../../hooks/useGetGoals'
import NoGoals from '../NoGoals'
import Spinner from '../spinner'

interface Props {
    userID: string
}

const WeeklyReview = ({ userID }: Props) => {
    const { allGoals } = useGetGoals(userID)

    if (!allGoals) {
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
                    {
                        allGoals.activeGoals.length === 0 ?
                        <NoGoals />
                        : <>Here are your goals {allGoals.activeGoals.length}</>
                    }
                </div>
            </div>
        </div>
    )
}

export default WeeklyReview