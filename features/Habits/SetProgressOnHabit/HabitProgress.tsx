import { useState } from 'react'

import EditIcon from '../../../components/Icons/EditIcon'
import { Habit } from '../habits.types'
import { ProgressForm } from './ProgressForm'

import style from './SetProgressOnHabit.module.scss'

export const HabitProgress: React.FunctionComponent<{
    progress: number
    habit: Habit
}> = ({ progress, habit }) => {
    const [progressFormOpen, setProgressFormOpen] = useState(false)

    return (
        <>
            <strong>
                {progress} / {habit.target}
            </strong>
            <EditIcon
                className={style.editIcon}
                onClick={() => setProgressFormOpen(true)}
            />
            <ProgressForm
                progressFormOpen={progressFormOpen}
                setProgressFormOpen={setProgressFormOpen}
                progress={progress}
                target={habit.target}
                habitID={habit.id}
            />
        </>
    )
}
