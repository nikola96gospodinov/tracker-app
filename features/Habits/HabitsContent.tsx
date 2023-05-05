import { useState } from 'react'

import InitialSection from '../../components/InitialSection'
import useUserLogged from '../../hooks/useUserLogged'
import HabitForm from './HabitForm'
import HabitsList from './HabitsList/HabitsList'
import AddIcon from '../../components/Icons/AddIcon'

export const HabitsContent = () => {
    const [addHabitsFormOpen, setAddHabitsFormOpen] = useState(false)
    const { userId } = useUserLogged()

    return (
        <>
            <InitialSection>
                <div className='header'>
                    <h1>My Habits</h1>
                    <AddIcon onClick={() => setAddHabitsFormOpen(true)} />
                </div>
                {userId && (
                    <HabitsList
                        userID={userId}
                        setAddHabitsFormOpen={setAddHabitsFormOpen}
                    />
                )}
                {addHabitsFormOpen && userId && (
                    <HabitForm
                        setHabitsFormOpen={setAddHabitsFormOpen}
                        userID={userId}
                    />
                )}
            </InitialSection>
        </>
    )
}
