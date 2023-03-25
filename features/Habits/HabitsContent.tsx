import { useState } from 'react'

import InitialSection from '../../components/InitialSection'
import useUserLogged from '../../hooks/useUserLogged'
import HabitForm from './HabitForm'
import HabitsList from './HabitsList/HabitsList'
import AddIcon from '../../components/Icons/AddIcon'

export const HabitsContent = () => {
    const [addHabitsFormOpen, setAddHabitsFormOpen] = useState(false)
    const { user } = useUserLogged()

    return (
        <>
            <InitialSection>
                <div className='header'>
                    <h1>My Habits</h1>
                    <AddIcon onClick={() => setAddHabitsFormOpen(true)} />
                </div>
                {user && (
                    <HabitsList
                        userID={user.uid}
                        setAddHabitsFormOpen={setAddHabitsFormOpen}
                    />
                )}
                {addHabitsFormOpen && user && (
                    <HabitForm
                        setHabitsFormOpen={setAddHabitsFormOpen}
                        userID={user.uid}
                    />
                )}
            </InitialSection>
        </>
    )
}
