import { AiTwotoneEdit } from 'react-icons/ai'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import { Habit } from '../habits.types'
import { Dispatch } from '../../../typings'

import style from '../habit.module.scss'

const HabitInfo: React.FunctionComponent<{
    habit: Habit
    setEditForm: Dispatch<boolean>
    setDeleteWarning: Dispatch<boolean>
}> = ({ habit, setEditForm, setDeleteWarning }) => (
    <div className={style.habitsPage}>
        <div className={style.headerSection}>
            <div>
                <div>
                    {habit.target} {habit.metric} {habit.type}
                </div>
                <div>
                    🔥<strong>{habit.currentStreak.streak}</strong>
                </div>
            </div>
            <div>
                <AiTwotoneEdit
                    className={style.editIcon}
                    onClick={() => setEditForm(true)}
                />
                <RiDeleteBin6Fill
                    className={style.deleteIcon}
                    onClick={() => setDeleteWarning(true)}
                />
            </div>
        </div>
        <h1>{habit.name}</h1>
        <p>{habit.description}</p>
        <p>
            <strong>Longest Streak:</strong> {habit.longestStreak.streak}
        </p>
        <p>
            <strong>Last Completed:</strong>{' '}
            {habit.currentStreak?.start ?? 'Never'}
        </p>

        <h2>Linked Goals</h2>
    </div>
)

export default HabitInfo
