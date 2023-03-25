import { Habit } from '../features/Habits/habits.types'

import style from './SetProgressOnHabit.module.scss'

const SetProgressOnHabit: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    return (
        <div className={style.progressInputWrapper}>
            <span>Done: </span>
            <strong>10</strong>

            {/* <input type='number' className={style.progressInput} /> */}
        </div>
    )
}

export default SetProgressOnHabit
