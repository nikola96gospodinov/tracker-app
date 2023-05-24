import { FunctionComponent } from 'react'
import { Goal } from '../../../../types/goals.types'
import { GoalBox } from '../../../Goal/GoalBox'

export const IncompletedGoals: FunctionComponent<{
    goals: Goal[]
}> = ({ goals }) => (
    <>
        {goals.map((goal) => (
            <GoalBox key={goal.id} goal={goal} />
        ))}
    </>
)
