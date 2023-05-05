import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import DeleteDoc from '../../../components/DeleteDoc'
import InitialSection from '../../../components/InitialSection'
import { Spinner } from '../../../components/UIElements/Spinner'
import useGetDoc from '../../../hooks/useGetDoc'
import { HABITS } from '../constants'
import { Habit } from '../habits.types'
import HabitForm from '../HabitForm'
import HabitInfo from './HabitInfo'
import { UserContext } from '../../../context/userContext'

const IndividualHabitContent = () => {
    const { userId } = useContext(UserContext)
    const router = useRouter()
    const { habitUrl } = router.query
    const {
        doc: habit,
        loading,
        errorFetching
    } = useGetDoc<Habit>({
        userID: userId,
        path: HABITS,
        url: habitUrl as string
    })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (loading || !userId) {
        return (
            <InitialSection>
                <Spinner />
            </InitialSection>
        )
    }

    if (!habit || errorFetching) {
        return (
            <InitialSection>
                <p>Habit doesn&apos;t exist</p>
            </InitialSection>
        )
    }

    return (
        <InitialSection>
            <HabitInfo
                habit={habit}
                setEditForm={setEditForm}
                setDeleteWarning={setDeleteWarning}
            />
            {editForm && (
                <HabitForm
                    setHabitsFormOpen={setEditForm}
                    userID={userId}
                    habit={habit}
                />
            )}
            {deleteWarning && (
                <DeleteDoc
                    setDeleteWarning={setDeleteWarning}
                    userID={userId}
                    doc={habit}
                    path={HABITS}
                />
            )}
        </InitialSection>
    )
}

export default IndividualHabitContent
