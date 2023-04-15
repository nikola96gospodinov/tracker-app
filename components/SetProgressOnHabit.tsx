import { Habit } from '../features/Habits/habits.types'
import BatteryIcon from './Icons/Battery'
import EditIcon from './Icons/EditIcon'

import style from './SetProgressOnHabit.module.scss'

const SetProgressOnHabit: React.FunctionComponent<{
    habit: Habit
}> = ({ habit }) => {
    return (
        <div className={style.progressInputWrapper}>
            <BatteryIcon
                className={style.progressIcon}
                current={10}
                total={habit.target}
            />
            <strong>10 / {habit.target}</strong>
            <EditIcon className={style.editIcon} />

            {/* <input type='number' className={style.progressInput} /> */}
        </div>
    )
}

export default SetProgressOnHabit
