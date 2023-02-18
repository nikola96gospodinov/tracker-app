import { useState } from 'react'
import { useRouter } from 'next/router'

import InitialSection from '../../../components/InitialSection'
import GoalInfo from './GoalInfo'
import Spinner from '../../../components/UIElements/spinner'
import GoalForm from '../GoalForm'
import useGetDocs from '../../../hooks/useGetDoc'
import GoalConfiguration from './GoalConfiguration'
import { Goal } from '../types'
import { GOALS } from '../constants'
import DeleteDoc from '../../../components/DeleteDoc'
import useUserLogged from '../../../hooks/useUserLogged'

const IndividualGoalContent = () => {
    const { user } = useUserLogged()
    const userID = user?.uid
    const router = useRouter()
    const { goalUrl } = router.query
    const { docs: goals } = useGetDocs<Goal>({
        userID: userID ?? '',
        path: GOALS
    })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (!goals || !userID) {
        return (
            <InitialSection>
                <Spinner size={10} />
            </InitialSection>
        )
    }

    const goal = goals?.find((goal) => goal.urlPath === goalUrl)

    if (!goal) {
        return (
            <InitialSection>
                <p>Goal doesn&apos;t exist</p>
            </InitialSection>
        )
    }

    return (
        <InitialSection>
            <GoalInfo
                goal={goal}
                setDeleteWarning={setDeleteWarning}
                setEditForm={setEditForm}
            />
            {editForm && (
                <GoalForm
                    setGoalsFormOpen={setEditForm}
                    userID={userID}
                    goal={goal}
                />
            )}
            {deleteWarning && (
                <DeleteDoc
                    setDeleteWarning={setDeleteWarning}
                    userID={userID}
                    docs={goals}
                    doc={goal}
                    path={GOALS}
                />
            )}
            <GoalConfiguration goal={goal} />
        </InitialSection>
    )
}

export default IndividualGoalContent
