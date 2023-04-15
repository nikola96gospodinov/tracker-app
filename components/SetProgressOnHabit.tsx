import { Habit } from '../features/Habits/habits.types'
import BatteryIcon from './Icons/Battery'

import style from './SetProgressOnHabit.module.scss'

const SetProgressOnHabit: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    return (
        <div className={style.progressInputWrapper}>
            <BatteryIcon current={15} total={habit.target} />
            <strong>10 / {habit.target}</strong>

            {/* <input type='number' className={style.progressInput} /> */}
        </div>
    )
}

export default SetProgressOnHabit
