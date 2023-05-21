import { Milestone } from '../../../../types/goals.types'

export const getProgressForUI = (milestone: Milestone) => {
    if (
        milestone.completed ||
        (milestone.progress &&
            milestone.target &&
            milestone.progress >= milestone.target)
    ) {
        return 'Completed! 🥳'
    }

    if (!milestone.target) return 'N/A'

    if (!milestone.progress && milestone.target)
        return `0 / ${milestone.target}`

    return `${milestone.progress} / ${milestone.target}`
}
