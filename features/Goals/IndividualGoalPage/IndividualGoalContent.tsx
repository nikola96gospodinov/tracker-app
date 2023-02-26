import { useState } from 'react'
import { useRouter } from 'next/router'

import InitialSection from '../../../components/InitialSection'
import GoalInfo from './GoalInfo'
import Spinner from '../../../components/UIElements/spinner'
import GoalForm from '../GoalForm'
import GoalConfiguration from './GoalConfiguration'
import { Goal } from '../goals.types'
import { GOALS } from '../constants'
import DeleteDoc from '../../../components/DeleteDoc'
import useUserLogged from '../../../hooks/useUserLogged'
import useGetDoc from '../../../hooks/useGetDoc'

const IndividualGoalContent = () => {
    const { user } = useUserLogged()
    const userID = user?.uid
    const router = useRouter()
    const { goalUrl } = router.query
    const {
        doc: goal,
        loading,
        errorFetching
    } = useGetDoc<Goal>({
        userID: userID ?? '',
        path: GOALS,
        url: goalUrl as string
    })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (!userID || loading) {
        return (
            <InitialSection>
                <Spinner size={10} />
            </InitialSection>
        )
    }

    if (errorFetching || !goal) {
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
                    doc={goal}
                    path={GOALS}
                />
            )}
            <GoalConfiguration goal={goal} />
        </InitialSection>
    )
}

export default IndividualGoalContent
