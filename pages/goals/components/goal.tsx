import Link from 'next/link'
import { toKebabCase } from '../../../helpers/functions'
import { Goal } from '../interfaces'

export const GoalBox = ({ goal }: { goal: Goal }) => {
    return (
        <div>
            <img />
            <div>
                <h3>{goal.name}</h3>
                <p>{goal.description}</p>
                <Link href={`/goals/active/${toKebabCase(goal.name)}`}>
                    <a>Configure goal</a>
                </Link>
            </div>
        </div>
    )
}