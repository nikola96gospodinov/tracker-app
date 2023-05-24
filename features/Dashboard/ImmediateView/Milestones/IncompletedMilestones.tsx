import { FunctionComponent } from 'react'
import { Milestone } from '../../../../types/goals.types'
import { MilestoneBox } from '../../UpcomingMilestones/MilestoneBox'

export const IncompletedMilestones: FunctionComponent<{
    milestones: Milestone[]
}> = ({ milestones }) => (
    <>
        {milestones.map((milestone) => (
            <MilestoneBox key={milestone.id} milestone={milestone} />
        ))}
    </>
)
