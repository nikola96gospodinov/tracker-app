import { useContext, useState } from 'react'

import InitialSection from '../../components/InitialSection'
import HabitForm from './HabitForm'
import HabitsList from './HabitsList/HabitsList'
import AddIcon from '../../components/Icons/AddIcon'
import { UserContext } from '../../context/userContext'

export const HabitsContent = () => {
    const [addHabitsFormOpen, setAddHabitsFormOpen] = useState(false)
    const { userId } = useContext(UserContext)

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
