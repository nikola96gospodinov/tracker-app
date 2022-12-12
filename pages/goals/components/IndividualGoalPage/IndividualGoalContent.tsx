import { useState } from 'react'
import { useRouter } from 'next/router'

import InitialSection from '../../../../components/InitialSection'
import GoalInfo from './GoalInfo'
import Spinner from '../../../../components/spinner'
import GoalForm from '../GoalForm'
import useGetDocs from '../../../../hooks/useGetDoc'
import GoalConfiguration from './GoalConfiguration'
import DeleteGoal from './DeleteGoal'
import { Goal } from '../../interfaces'
import { GOALS } from '../../constants'

interface Props {
    userID: string
}

const IndividualGoalContent = ({ userID }: Props) => {
    const router = useRouter()
    const { goalUrl } = router.query
    const { docs: goals } = useGetDocs<Goal>({ userID, path: GOALS })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (!goals) {
        return (
            <InitialSection>
                <Spinner />
            </InitialSection>
        )
    }

    const goal = goals?.find(goal => goal.urlPath === goalUrl)

    if (!goal) {
        return (
            <InitialSection>
                <p>Goal doesn&apos;t exist</p>
            </InitialSection>
        )
    }

    return (
        <InitialSection>
            <GoalInfo goal={goal} setDeleteWarning={setDeleteWarning} setEditForm={setEditForm} />
            { editForm && <GoalForm setGoalsFormOpen={setEditForm} userID={userID} goal={goal} /> }
            { deleteWarning && <DeleteGoal setDeleteWarning={setDeleteWarning} userID={userID} goals={goals} goal={goal} /> }
            <GoalConfiguration goal={goal} />
        </InitialSection>
    )
}

export default IndividualGoalContent