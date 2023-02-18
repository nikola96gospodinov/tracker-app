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
                    🔥<strong>{habit.currentStreak}</strong>
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
            <strong>Longest Streak:</strong> {habit.longestStreak}
        </p>
        <p>
            <strong>Last Completed:</strong> {habit.lastCompleted ?? 'Never'}
        </p>

        <h2>Linked Goals</h2>
        {(!habit.attachedGoals || habit.attachedGoals.length === 0) && (
            <p>No goals linked currently</p>
        )}
        {habit.attachedGoals &&
            habit.attachedGoals?.length > 0 &&
            habit.attachedGoals.map((goal) => <p key={goal}>{goal}</p>)}
    </div>
)

export default HabitInfo
