import { useState } from 'react'
import { MdAddBox } from 'react-icons/md'

import InitialSection from '../../components/InitialSection'
import useUserLogged from '../../hooks/useUserLogged'
import HabitForm from './HabitForm'
import HabitsList from './HabitsList/HabitsList'

export const HabitsContent = () => {
    const [addHabitsFormOpen, setAddHabitsFormOpen] = useState(false)
    const { user } = useUserLogged()

    return (
        <>
            <InitialSection>
                <div className='header'>
                    <h1>My Habits</h1>
                    <MdAddBox onClick={() => setAddHabitsFormOpen(true)} />
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
