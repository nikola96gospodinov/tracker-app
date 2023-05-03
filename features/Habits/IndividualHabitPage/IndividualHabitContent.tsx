import { useRouter } from 'next/router'
import { useState } from 'react'

import DeleteDoc from '../../../components/DeleteDoc'
import InitialSection from '../../../components/InitialSection'
import { Spinner } from '../../../components/UIElements/Spinner'
import useGetDoc from '../../../hooks/useGetDoc'
import useUserLogged from '../../../hooks/useUserLogged'
import { HABITS } from '../constants'
import { Habit } from '../habits.types'
import HabitForm from '../HabitForm'
import HabitInfo from './HabitInfo'

const IndividualHabitContent = () => {
    const { user } = useUserLogged()
    const userID = user?.uid
    const router = useRouter()
    const { habitUrl } = router.query
    const {
        doc: habit,
        loading,
        errorFetching
    } = useGetDoc<Habit>({
        userID: userID ?? '',
        path: HABITS,
        url: habitUrl as string
    })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (loading || !userID) {
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
                    userID={userID}
                    habit={habit}
                />
            )}
            {deleteWarning && (
                <DeleteDoc
                    setDeleteWarning={setDeleteWarning}
                    userID={userID}
                    doc={habit}
                    path={HABITS}
                />
            )}
        </InitialSection>
    )
}

export default IndividualHabitContent
