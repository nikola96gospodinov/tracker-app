import { useRouter } from 'next/router'
import { useState } from 'react'

import DeleteDoc from '../../../components/DeleteDoc'
import InitialSection from '../../../components/InitialSection'
import Spinner from '../../../components/spinner'
import useGetDocs from '../../../hooks/useGetDoc'
import { HABITS } from '../../../pages/habits//constants'
import { Habit } from '../../../pages/habits//types'
import HabitForm from '../HabitForm'
import HabitInfo from './HabitInfo'

const IndividualHabitContent: React.FunctionComponent<{
    userID: string
}> = ({ userID }) => {
    const router = useRouter()
    const { habitUrl } = router.query
    const { docs: habits } = useGetDocs<Habit>({ userID, path: HABITS })
    const [editForm, setEditForm] = useState(false)
    const [deleteWarning, setDeleteWarning] = useState(false)

    if (!habits) {
        return (
            <InitialSection>
                <Spinner />
            </InitialSection>
        )
    }

    const habit = habits?.find((habit) => habit.urlPath === habitUrl)

    if (!habit) {
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
                    docs={habits}
                    doc={habit}
                    path={HABITS}
                />
            )}
        </InitialSection>
    )
}

export default IndividualHabitContent
