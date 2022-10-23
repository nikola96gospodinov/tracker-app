import Link from 'next/link'
import { Goal } from './interfaces'

export const GoalBox = ({ goal }: { goal: Goal }) => {
    return (
        <div>
            <img />
            <div>
                <h3>{goal.name}</h3>
                <p>{goal.description}</p>
                <Link href='/'>
                    <a>Configure goal</a>
                </Link>
            </div>
        </div>
    )
}