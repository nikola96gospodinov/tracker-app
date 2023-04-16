import { useState } from 'react'

import { Habit } from '../habits.types'
import BatteryIcon from '../../../components/Icons/Battery'
import EditIcon from '../../../components/Icons/EditIcon'

import style from './SetProgressOnHabit.module.scss'
import { ProgressForm } from './ProgressForm'

const SetProgressOnHabit: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    const [progressFormOpen, setProgressFormOpen] = useState(false)
    const progress = habit.progress ?? 0

    return (
        <>
            <div className={style.progressInputWrapper}>
                <BatteryIcon
                    className={style.progressIcon}
                    current={progress}
                    total={habit.target}
                />
                <strong>
                    {progress} / {habit.target}
                </strong>
                <EditIcon
                    className={style.editIcon}
                    onClick={() => setProgressFormOpen(true)}
                />
            </div>
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

export default SetProgressOnHabit
