import Link from 'next/link'
import { AiTwotoneEdit } from 'react-icons/ai'

import { Habit } from '../habits.types'
import style from '../habit.module.scss'

export const HabitBox: React.FunctionComponent<{
    habit: Habit
}> = ({
    habit: { urlPath, type, name, description, currentStreak, target, metric }
}) => {
    const href = `/habits/${urlPath}`

    return (
        <Link href={href}>
            <a className={style.habitBox}>
                <div className={style.streak}>{`🔥${currentStreak}`}</div>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>
                    <strong>Target:</strong> {target} {metric} {type}
                </p>
                <AiTwotoneEdit className={style.editIcon} />
            </a>
        </Link>
    )
}

// TODO: For later
// {editFormOpen && (
//     <HabitForm
//         setHabitsFormOpen={setEditFormOpen}
//         userID={userID}
//         habit={habit}
//     />
// )}
// {deleteWarning && (
//     <DeleteDoc
//         setDeleteWarning={setDeleteWarning}
//         userID={userID}
//         doc={habit}
//         docs={habits}
//         path={HABITS}
//     />
// )}
