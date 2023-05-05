import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

import InitialSection from '../../../components/InitialSection'
import GoalInfo from './GoalInfo'
import { Spinner } from '../../../components/UIElements/Spinner'
import GoalForm from '../GoalForm'
import GoalConfiguration from './GoalConfiguration'
import { Goal } from '../goals.types'
import { GOALS } from '../constants'
import DeleteDoc from '../../../components/Docs/DeleteDoc'
import useGetDoc from '../../../hooks/useGetDoc'
import { UserContext } from '../../../context/userContext'

const IndividualGoalContent = () => {
    const { userId } = useContext(UserContext)
    const router = useRouter()
    const { goalUrl } = router.query
    const {
        doc: goal,
        loading,
        errorFetching
    } = useGetDoc<Goal>({
        userID: userId,
        path: GOALS,
        url: goalUrl as string
    })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (!userId || loading) {
        return (
            <InitialSection>
                <Spinner />
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
                    userID={userId}
                    goal={goal}
                />
            )}
            {deleteWarning && (
                <DeleteDoc
                    setDeleteWarning={setDeleteWarning}
                    userID={userId}
                    doc={goal}
                    path={GOALS}
                />
            )}
            <GoalConfiguration goal={goal} />
        </InitialSection>
    )
}

export default IndividualGoalContent
